import type {
  Dimension, DimensionScores, CareerTypeId, CareerTypeMatch,
  IncomeEstimate, IncomeRange, GrowthSpeed, DiagnosisResult,
  DiagnosisAnswers,
} from '@/types/diagnosis'
import {
  calculateRawScores, normalizeScores, calculateReliabilityScore,
  getStrengths, getWeaknesses,
} from './scoring'
import { clamp } from '@/lib/utils'

// Career type dimension profiles (0-100 scale)
// Each type has 1-2 "signature" dimensions that are extreme (≥90) to ensure clear separation.
// Types that previously clustered (consultant/executive/finance/PM) now have distinct peaks.
const CAREER_TYPE_PROFILES: Record<CareerTypeId, DimensionScores> = {
  entrepreneur:  { RT:95, AT:70, LP:85, ID:95, SI:60, TA:40, SP:5,  AM:95, CT:75, PE:85 },
  executive:     { RT:60, AT:75, LP:95, ID:65, SI:90, TA:40, SP:40, AM:85, CT:50, PE:80 },
  specialist:    { RT:35, AT:90, LP:45, ID:60, SI:55, TA:95, SP:65, AM:80, CT:60, PE:90 },
  sales:         { RT:65, AT:45, LP:75, ID:55, SI:95, TA:25, SP:35, AM:85, CT:50, PE:70 },
  researcher:    { RT:45, AT:95, LP:40, ID:85, SI:40, TA:90, SP:55, AM:75, CT:70, PE:90 },
  creator:       { RT:55, AT:45, LP:35, ID:90, SI:55, TA:50, SP:30, AM:70, CT:95, PE:75 },
  engineer:      { RT:50, AT:90, LP:50, ID:70, SI:50, TA:95, SP:55, AM:75, CT:65, PE:85 },
  consultant:    { RT:65, AT:95, LP:65, ID:75, SI:65, TA:65, SP:40, AM:90, CT:60, PE:75 },
  finance:       { RT:75, AT:95, LP:55, ID:60, SI:50, TA:70, SP:50, AM:95, CT:40, PE:85 },
  medical:       { RT:30, AT:85, LP:55, ID:50, SI:80, TA:95, SP:75, AM:80, CT:45, PE:95 },
  publicServant: { RT:15, AT:65, LP:45, ID:35, SI:70, TA:45, SP:95, AM:50, CT:35, PE:80 },
  craftsman:     { RT:35, AT:50, LP:40, ID:50, SI:60, TA:90, SP:75, AM:65, CT:60, PE:90 },
  educator:      { RT:30, AT:70, LP:70, ID:60, SI:90, TA:55, SP:65, AM:70, CT:60, PE:85 },
  marketer:      { RT:65, AT:80, LP:60, ID:80, SI:75, TA:55, SP:35, AM:80, CT:85, PE:70 },
  producer:      { RT:65, AT:65, LP:85, ID:90, SI:85, TA:45, SP:30, AM:85, CT:80, PE:75 },
  nurse:         { RT:25, AT:65, LP:50, ID:40, SI:95, TA:85, SP:80, AM:70, CT:35, PE:95 },
  webDesigner:   { RT:50, AT:60, LP:35, ID:80, SI:55, TA:85, SP:45, AM:65, CT:95, PE:75 },
  hrSpecialist:  { RT:35, AT:65, LP:75, ID:50, SI:90, TA:40, SP:65, AM:70, CT:45, PE:80 },
  lawyer:        { RT:45, AT:95, LP:60, ID:45, SI:65, TA:55, SP:70, AM:85, CT:40, PE:95 },
  projectManager:{ RT:55, AT:75, LP:85, ID:60, SI:70, TA:65, SP:65, AM:80, CT:50, PE:85 },
  writer:        { RT:45, AT:65, LP:30, ID:70, SI:55, TA:45, SP:55, AM:65, CT:95, PE:85 },
  counselor:     { RT:25, AT:55, LP:50, ID:45, SI:95, TA:45, SP:75, AM:65, CT:55, PE:90 },
  chef:          { RT:50, AT:50, LP:60, ID:80, SI:70, TA:90, SP:55, AM:75, CT:85, PE:95 },
  beautician:    { RT:45, AT:40, LP:55, ID:70, SI:90, TA:75, SP:55, AM:65, CT:85, PE:90 },
  socialWorker:  { RT:30, AT:55, LP:65, ID:60, SI:95, TA:35, SP:65, AM:70, CT:50, PE:85 },
}

// Base median income (万円/年) — realistic Japanese market medians (not best-case)
const BASE_MEDIAN_INCOME: Record<CareerTypeId, number> = {
  entrepreneur:  700,
  executive:     950,
  specialist:    650,
  sales:         520,
  researcher:    620,
  creator:       360,
  engineer:      530,
  consultant:    680,
  finance:       720,
  medical:       1050,
  publicServant: 500,
  craftsman:     360,
  educator:      460,
  marketer:      500,
  producer:      560,
  nurse:         470,
  webDesigner:   400,
  hrSpecialist:  480,
  lawyer:        680,
  projectManager:620,
  writer:        340,
  counselor:     360,
  chef:          310,
  beautician:    290,
  socialWorker:  320,
}

// Dimension weights for matching — TA/SI/CT boosted now that Q31-35 measure them properly
const MATCH_WEIGHTS: Record<Dimension, number> = {
  RT: 1.2, AT: 1.1, LP: 1.1, ID: 1.0, SI: 1.2,
  TA: 1.3, SP: 1.0, AM: 1.3, CT: 1.1, PE: 1.1,
}

const DIMS: Dimension[] = ['RT', 'AT', 'LP', 'ID', 'SI', 'TA', 'SP', 'AM', 'CT', 'PE']

function weightedCosineSimilarity(userScores: DimensionScores, profile: DimensionScores): number {
  let dot = 0
  let magUser = 0
  let magProfile = 0

  for (const dim of DIMS) {
    const w = MATCH_WEIGHTS[dim]
    const u = (userScores[dim] ?? 0) / 100
    const p = (profile[dim] ?? 0) / 100
    dot += w * u * p
    magUser += w * u * u
    magProfile += w * p * p
  }

  const mag = Math.sqrt(magUser) * Math.sqrt(magProfile)
  if (mag === 0) return 0
  return clamp((dot / mag) * 100, 0, 100)
}

// Euclidean similarity: penalises absolute mismatches that cosine similarity ignores
function weightedEuclideanSimilarity(userScores: DimensionScores, profile: DimensionScores): number {
  let sumSqDiff = 0
  let totalWeight = 0

  for (const dim of DIMS) {
    const w = MATCH_WEIGHTS[dim]
    const diff = ((userScores[dim] ?? 0) - (profile[dim] ?? 0)) / 100
    sumSqDiff += w * diff * diff
    totalWeight += w
  }

  const normalizedDist = Math.sqrt(sumSqDiff / totalWeight)
  return clamp((1 - normalizedDist) * 100, 0, 100)
}

function matchCareerTypes(userScores: DimensionScores): CareerTypeMatch[] {
  const matches: { id: CareerTypeId; score: number }[] = []

  for (const [typeId, profile] of Object.entries(CAREER_TYPE_PROFILES) as [CareerTypeId, DimensionScores][]) {
    const cos = weightedCosineSimilarity(userScores, profile)
    const euc = weightedEuclideanSimilarity(userScores, profile)
    // Blend: euclidean dominates (0.65) to create clear separation; cosine keeps direction
    const score = Math.round(cos * 0.35 + euc * 0.65)
    matches.push({ id: typeId, score })
  }

  return matches
    .sort((a, b) => b.score - a.score)
    .map((m, i) => ({ id: m.id, matchScore: m.score, rank: i + 1 }))
}

function calcPerformanceMultiplier(scores: DimensionScores): number {
  return (
    scores.AT * 0.18 +
    scores.AM * 0.22 +
    scores.PE * 0.15 +
    scores.LP * 0.12 +
    scores.RT * 0.10 +
    scores.ID * 0.12 +
    scores.TA * 0.11
  ) / 100
}

function estimateIncome(
  topType: CareerTypeId,
  scores: DimensionScores,
): IncomeEstimate {
  const baseMedian = BASE_MEDIAN_INCOME[topType]
  const perf = calcPerformanceMultiplier(scores)

  // Income = base × (0.55 + perf × 0.60) → range: 0.55x ~ 1.15x
  // Average performer (perf≈0.5) → ×0.85、top performer (perf≈1.0) → ×1.15
  const currentMedian = Math.round(baseMedian * (0.55 + perf * 0.60))

  const growthComposite = (
    scores.AM * 0.30 +
    scores.ID * 0.20 +
    scores.PE * 0.25 +
    scores.AT * 0.15 +
    scores.LP * 0.10
  ) / 100

  const annualGrowthRate = 0.02 + growthComposite * 0.05 // 2% ~ 7%/year

  const year5 = Math.round(currentMedian * Math.pow(1 + annualGrowthRate, 5))
  const year10 = Math.round(currentMedian * Math.pow(1 + annualGrowthRate, 10))

  let range: IncomeRange
  if (currentMedian < 300) range = '<300'
  else if (currentMedian < 600) range = '300-600'
  else if (currentMedian < 1000) range = '600-1000'
  else if (currentMedian < 3000) range = '1000-3000'
  else range = '>3000'

  return { currentMedian, year5, year10, range, annualGrowthRate }
}

function calcSuccessProbability(scores: DimensionScores): number {
  return clamp(Math.round(
    scores.AM * 0.25 +
    scores.PE * 0.25 +
    scores.AT * 0.20 +
    scores.LP * 0.15 +
    scores.RT * 0.15
  ), 0, 100)
}

function calcGrowthSpeed(scores: DimensionScores): GrowthSpeed {
  const composite = (
    scores.AM * 0.30 +
    scores.ID * 0.20 +
    scores.PE * 0.25 +
    scores.AT * 0.15 +
    scores.LP * 0.10
  ) / 100

  if (composite > 0.70) return 'fast'
  if (composite > 0.45) return 'medium'
  return 'slow'
}

const PRIORITY_SKILLS_MAP: Record<Dimension, string[]> = {
  RT: ['リスク管理・意思決定力', '投資・資産運用の知識', '不確実性への耐性トレーニング'],
  AT: ['データ分析・統計', 'ロジカルシンキング', 'SQL・Pythonなどの分析ツール'],
  LP: ['チームマネジメント', 'プレゼンテーション・交渉力', 'コーチング・ファシリテーション'],
  ID: ['デザイン思考・UX', 'ビジネスモデル設計', '市場調査・トレンド分析'],
  SI: ['傾聴力・共感力の訓練', 'ネットワーキング', '対人コミュニケーション'],
  TA: ['専門技術の継続学習', '資格取得・認定', 'ツール・技術の実践経験'],
  SP: ['プロジェクト管理（PMP・Agile）', 'リスク管理', '業務プロセス設計'],
  AM: ['目標設定フレームワーク（OKR）', 'メンタルトレーニング', '成果計測の習慣化'],
  CT: ['デザイン・表現スキル', 'アイデア発想法（SCAMPER・ブレスト）', 'クリエイティブな副業'],
  PE: ['習慣化メソッド', '長期プロジェクト管理', 'リカバリー・回復力の強化'],
}

function getPrioritySkills(weaknesses: Dimension[]): string[] {
  const skills: string[] = []
  for (const dim of weaknesses.slice(0, 3)) {
    skills.push(...(PRIORITY_SKILLS_MAP[dim]?.slice(0, 2) ?? []))
  }
  return skills.slice(0, 5)
}

// Penalise aspirational career types when real-world evidence doesn't support the match.
// Entrepreneur/executive attract anyone with high AM because those types value achievement —
// but true entrepreneurial fit requires demonstrated action (Q28) and genuine risk/anti-stability signals.
function applyContextualPenalties(
  matches: CareerTypeMatch[],
  answers: DiagnosisAnswers,
  scores: DimensionScores,
): CareerTypeMatch[] {
  const q28 = answers[28] // actual side-business / startup / investment experience

  const adjusted = matches.map(m => {
    let s = m.matchScore

    if (m.id === 'entrepreneur') {
      if (q28 === 'A') s = Math.round(s * 0.68)      // never acted → heavy penalty
      else if (q28 === 'B') s = Math.round(s * 0.80) // only thought about it → moderate penalty
      if (scores.SP > 50) s = Math.round(s * 0.82)   // still wants stability → not entrepreneurial
    }

    if (m.id === 'executive') {
      if (scores.LP < 60) s = Math.round(s * 0.78)   // low leadership → poor executive fit
      if (scores.SI < 55) s = Math.round(s * 0.85)   // weak people-reading → poor exec fit
    }

    return { ...m, matchScore: Math.max(s, 1) }
  })

  return adjusted
    .sort((a, b) => b.matchScore - a.matchScore)
    .map((m, i) => ({ ...m, rank: i + 1 }))
}

export function runDiagnosis(answers: DiagnosisAnswers): DiagnosisResult {
  const raw = calculateRawScores(answers)
  const dimensionScores = normalizeScores(raw)
  const rawMatches = matchCareerTypes(dimensionScores)
  const careerTypeMatches = applyContextualPenalties(rawMatches, answers, dimensionScores)
  const topCareerType = careerTypeMatches[0].id
  const incomeEstimate = estimateIncome(topCareerType, dimensionScores)
  const successProbability = calcSuccessProbability(dimensionScores)
  const growthSpeed = calcGrowthSpeed(dimensionScores)
  const reliabilityScore = calculateReliabilityScore(answers)
  const strengths = getStrengths(dimensionScores, 3)
  const weaknesses = getWeaknesses(dimensionScores, 3)
  const prioritySkills = getPrioritySkills(weaknesses)

  return {
    dimensionScores,
    careerTypeMatches,
    topCareerType,
    incomeEstimate,
    successProbability,
    growthSpeed,
    reliabilityScore,
    strengths,
    weaknesses,
    prioritySkills,
  }
}
