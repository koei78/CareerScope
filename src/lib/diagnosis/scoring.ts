import type { Dimension, DimensionScores, DiagnosisAnswers } from '@/types/diagnosis'
import { QUESTIONS, TOTAL_QUESTIONS } from './questions'
import { clamp } from '@/lib/utils'

// Maximum theoretical raw score per dimension (used for normalization)
// Updated to account for Section F questions (Q31-Q35) which add TA/SI/CT coverage
const MAX_RAW_SCORES: Record<Dimension, number> = {
  RT: 36,
  AT: 52,
  LP: 35,
  ID: 42,
  SI: 45,
  TA: 24,
  SP: 30,
  AM: 50,
  CT: 34,
  PE: 40,
}

export function calculateRawScores(answers: DiagnosisAnswers): Record<Dimension, number> {
  const raw: Record<Dimension, number> = {
    RT: 0, AT: 0, LP: 0, ID: 0, SI: 0,
    TA: 0, SP: 0, AM: 0, CT: 0, PE: 0,
  }

  for (const question of QUESTIONS) {
    const selectedOptionId = answers[question.id]
    if (!selectedOptionId) continue

    const option = question.options.find(o => o.id === selectedOptionId)
    if (!option) continue

    for (const [dim, score] of Object.entries(option.scores) as [Dimension, number][]) {
      raw[dim] = (raw[dim] || 0) + score
    }
  }

  return raw
}

export function normalizeScores(raw: Record<Dimension, number>): DimensionScores {
  const normalized = {} as DimensionScores
  const dims: Dimension[] = ['RT', 'AT', 'LP', 'ID', 'SI', 'TA', 'SP', 'AM', 'CT', 'PE']

  for (const dim of dims) {
    const rawVal = raw[dim] ?? 0
    const maxVal = MAX_RAW_SCORES[dim]
    normalized[dim] = clamp(Math.round((rawVal / maxVal) * 100), 0, 100)
  }

  return normalized
}

export function calculateReliabilityScore(answers: DiagnosisAnswers): number {
  const answeredCount = Object.keys(answers).length
  const completionRate = answeredCount / TOTAL_QUESTIONS

  // Check for internal consistency
  // High RT but all SP answers would be inconsistent
  const raw = calculateRawScores(answers)
  const rtRaw = raw.RT
  const spRaw = raw.SP

  // Contradiction penalty: if RT and SP are both very high, lower reliability
  const contradictionPenalty = Math.max(0, (rtRaw + spRaw - 20) * 0.5)

  const baseScore = 85 * completionRate
  const reliabilityScore = clamp(Math.round(baseScore - contradictionPenalty + 10), 50, 98)

  return reliabilityScore
}

export function getStrengths(scores: DimensionScores, count = 3): Dimension[] {
  const dims = Object.entries(scores) as [Dimension, number][]
  return dims
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([dim]) => dim)
}

export function getWeaknesses(scores: DimensionScores, count = 3): Dimension[] {
  const dims = Object.entries(scores) as [Dimension, number][]
  return dims
    .sort((a, b) => a[1] - b[1])
    .slice(0, count)
    .map(([dim]) => dim)
}
