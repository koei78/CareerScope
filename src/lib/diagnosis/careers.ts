import type { Career, CareerRankItem } from '@/types/career'
import type { DimensionScores } from '@/types/diagnosis'

export const CAREERS: Career[] = [
  // IT系
  {
    id: 'software-engineer',
    slug: 'software-engineer',
    name: 'ソフトウェアエンジニア',
    category: 'it',
    description: 'プログラミングとシステム設計で価値あるプロダクトを構築する',
    medianIncome: 720,
    incomeRange: { min: 400, max: 2000 },
    requiredSkills: ['プログラミング', 'システム設計', 'アルゴリズム', '問題解決力'],
    avgYearsToReach: 3,
    growthOutlook: 'growing',
    workStyle: ['リモート可', '成果主義', 'チーム開発'],
    careerPath: ['ジュニアエンジニア', 'シニアエンジニア', 'テックリード', 'CTO'],
    relatedCareers: ['data-scientist', 'product-manager', 'devops-engineer'],
  },
  {
    id: 'data-scientist',
    slug: 'data-scientist',
    name: 'データサイエンティスト',
    category: 'it',
    description: 'データ分析とAI/MLで意思決定を科学的にサポートする',
    medianIncome: 800,
    incomeRange: { min: 500, max: 2500 },
    requiredSkills: ['統計学', 'Python/R', '機械学習', 'ビジネス理解', 'SQL'],
    avgYearsToReach: 4,
    growthOutlook: 'growing',
    workStyle: ['リモート可', 'データドリブン', '研究的'],
    careerPath: ['アナリスト', 'データサイエンティスト', 'MLエンジニア', 'AIリサーチャー'],
    relatedCareers: ['software-engineer', 'consultant', 'quantitative-analyst'],
  },
  {
    id: 'product-manager',
    slug: 'product-manager',
    name: 'プロダクトマネージャー',
    category: 'it',
    description: 'ユーザーとビジネスの橋渡しをしながら製品戦略を立案・実行する',
    medianIncome: 900,
    incomeRange: { min: 600, max: 2500 },
    requiredSkills: ['プロダクト戦略', 'データ分析', 'UX思考', 'コミュニケーション', 'ロードマップ設計'],
    avgYearsToReach: 5,
    growthOutlook: 'growing',
    workStyle: ['クロスファンクショナル', '意思決定多い', '結果責任'],
    careerPath: ['APM', 'PM', 'シニアPM', 'VP of Product', 'CPO'],
    relatedCareers: ['software-engineer', 'ux-designer', 'startup-founder'],
  },
  // ビジネス系
  {
    id: 'management-consultant',
    slug: 'management-consultant',
    name: '経営コンサルタント',
    category: 'business',
    description: '高度な分析と知識で企業の戦略課題を解決するアドバイザー',
    medianIncome: 1200,
    incomeRange: { min: 700, max: 3000 },
    requiredSkills: ['戦略思考', '問題解決力', 'コミュニケーション', '業界知識', 'プレゼン'],
    avgYearsToReach: 5,
    growthOutlook: 'stable',
    workStyle: ['高強度', '出張多い', 'プロジェクト単位'],
    careerPath: ['アナリスト', 'コンサルタント', 'マネージャー', 'パートナー'],
    relatedCareers: ['cfo', 'startup-founder', 'venture-capitalist'],
  },
  {
    id: 'startup-founder',
    slug: 'startup-founder',
    name: 'スタートアップ創業者',
    category: 'entrepreneurship',
    description: 'ゼロから事業を立ち上げ、市場に新たな価値を創出する',
    medianIncome: 2000,
    incomeRange: { min: 0, max: 100000 },
    requiredSkills: ['事業構築力', 'リーダーシップ', '資金調達', '市場調査', '採用力'],
    avgYearsToReach: 7,
    growthOutlook: 'growing',
    workStyle: ['高リスク高リターン', '全権限', '激務'],
    careerPath: ['副業・スモールビジネス', 'シードスタートアップ', 'シリーズA以降', 'EXIT'],
    relatedCareers: ['product-manager', 'venture-capitalist', 'management-consultant'],
  },
  {
    id: 'marketing-director',
    slug: 'marketing-director',
    name: 'マーケティングディレクター',
    category: 'business',
    description: '市場戦略を設計し、ブランドと顧客をつなぐマーケティングを統括する',
    medianIncome: 800,
    incomeRange: { min: 500, max: 2000 },
    requiredSkills: ['マーケティング戦略', 'データ分析', 'ブランディング', 'デジタルマーケ', 'コピーライティング'],
    avgYearsToReach: 8,
    growthOutlook: 'growing',
    workStyle: ['クリエイティブ', 'データドリブン', '多様なステークホルダー'],
    careerPath: ['マーケター', 'マーケティングマネージャー', 'CMO'],
    relatedCareers: ['product-manager', 'ux-designer', 'startup-founder'],
  },
  // 金融系
  {
    id: 'venture-capitalist',
    slug: 'venture-capitalist',
    name: 'ベンチャーキャピタリスト',
    category: 'finance',
    description: 'スタートアップを発掘・投資し、次世代の産業を育てる',
    medianIncome: 1500,
    incomeRange: { min: 800, max: 10000 },
    requiredSkills: ['投資分析', 'スタートアップ理解', 'ネットワーク', '財務モデリング', '事業評価'],
    avgYearsToReach: 10,
    growthOutlook: 'growing',
    workStyle: ['高裁量', '投資判断', 'ネットワーク重要'],
    careerPath: ['アナリスト', 'アソシエイト', 'VP', 'パートナー', 'GP'],
    relatedCareers: ['management-consultant', 'startup-founder', 'investment-banker'],
  },
  {
    id: 'investment-banker',
    slug: 'investment-banker',
    name: '投資銀行家',
    category: 'finance',
    description: 'M&A・IPO・資金調達などの大型金融取引をアドバイザリングする',
    medianIncome: 1300,
    incomeRange: { min: 700, max: 5000 },
    requiredSkills: ['財務モデリング', 'M&A知識', 'プレゼン', '英語', '数的処理'],
    avgYearsToReach: 6,
    growthOutlook: 'stable',
    workStyle: ['超高強度', '高報酬', 'エリート環境'],
    careerPath: ['アナリスト', 'アソシエイト', 'VP', 'ディレクター', 'MD'],
    relatedCareers: ['venture-capitalist', 'management-consultant', 'private-equity'],
  },
  // クリエイティブ系
  {
    id: 'ux-designer',
    slug: 'ux-designer',
    name: 'UX/UIデザイナー',
    category: 'creative',
    description: 'ユーザーの体験を設計し、使いやすく美しいプロダクトを創る',
    medianIncome: 600,
    incomeRange: { min: 350, max: 1500 },
    requiredSkills: ['UI設計', 'ユーザーリサーチ', 'Figma', 'プロトタイピング', 'デザインシステム'],
    avgYearsToReach: 3,
    growthOutlook: 'growing',
    workStyle: ['クリエイティブ', 'コラボレーション', 'ツール重要'],
    careerPath: ['UIデザイナー', 'UXデザイナー', 'デザインリード', 'CDO'],
    relatedCareers: ['product-manager', 'software-engineer', 'brand-designer'],
  },
  {
    id: 'content-creator',
    slug: 'content-creator',
    name: 'コンテンツクリエイター',
    category: 'creative',
    description: '独自のコンテンツで多くの人を惹きつけ、メディアビジネスを構築する',
    medianIncome: 400,
    incomeRange: { min: 0, max: 10000 },
    requiredSkills: ['コンテンツ企画', '動画・文章制作', 'SNS運用', 'ブランディング', 'マネタイズ'],
    avgYearsToReach: 3,
    growthOutlook: 'growing',
    workStyle: ['自由度高い', '実力主義', '継続力必要'],
    careerPath: ['副業クリエイター', 'フルタイムクリエイター', 'メディア企業', '起業'],
    relatedCareers: ['marketing-director', 'startup-founder', 'ux-designer'],
  },
  // 医療・福祉系
  {
    id: 'physician',
    slug: 'physician',
    name: '医師',
    category: 'medical',
    description: '医学的知識と技術で患者の健康を守る社会的に重要な専門職',
    medianIncome: 1400,
    incomeRange: { min: 1000, max: 5000 },
    requiredSkills: ['医学知識', '診断力', 'コミュニケーション', '体力・精神力', '判断力'],
    avgYearsToReach: 12,
    growthOutlook: 'stable',
    workStyle: ['責任重大', '専門性重視', '継続学習必須'],
    careerPath: ['研修医', '専攻医', '専門医', '部長・院長', '教授'],
    relatedCareers: ['nurse-practitioner', 'medical-researcher', 'healthcare-consultant'],
  },
  // 教育・研究系
  {
    id: 'researcher',
    slug: 'researcher',
    name: '研究者・サイエンティスト',
    category: 'education',
    description: '知識の最前線を探求し、新たな発見をもたらすイノベーター',
    medianIncome: 750,
    incomeRange: { min: 400, max: 2000 },
    requiredSkills: ['研究設計', '統計・データ解析', '論文執筆', '専門知識', '英語'],
    avgYearsToReach: 8,
    growthOutlook: 'stable',
    workStyle: ['深い専門性', '自律的', '国際的'],
    careerPath: ['研究助手', 'ポスドク', '助教', '准教授', '教授'],
    relatedCareers: ['data-scientist', 'management-consultant', 'engineer'],
  },
]

export function rankCareersForUser(scores: DimensionScores): CareerRankItem[] {
  return CAREERS.map(career => {
    // Simple scoring based on career category alignment
    const aptitudeScore = calcAptitudeScore(career, scores)
    const successProbability = Math.round(aptitudeScore * 0.9 + Math.random() * 5)
    const incomeMultiplier = (
      scores.AM * 0.25 + scores.PE * 0.20 + scores.AT * 0.15 +
      scores.LP * 0.15 + scores.RT * 0.10 + scores.ID * 0.15
    ) / 100
    const estimatedMedianIncome = Math.round(career.medianIncome * (0.70 + incomeMultiplier * 0.60))

    return {
      career,
      aptitudeScore,
      successProbability: Math.min(95, successProbability),
      fitReason: getFitReason(career, scores),
      caution: getCaution(career, scores),
      estimatedMedianIncome,
    }
  }).sort((a, b) => b.aptitudeScore - a.aptitudeScore)
}

function calcAptitudeScore(career: Career, scores: DimensionScores): number {
  const categoryWeights: Record<string, Partial<Record<keyof DimensionScores, number>>> = {
    it:               { AT: 0.35, TA: 0.30, PE: 0.20, ID: 0.15 },
    business:         { AT: 0.25, LP: 0.25, AM: 0.25, SI: 0.25 },
    creative:         { CT: 0.35, ID: 0.30, PE: 0.20, SI: 0.15 },
    medical:          { AT: 0.30, PE: 0.30, SI: 0.25, TA: 0.15 },
    education:        { SI: 0.35, AT: 0.25, PE: 0.25, LP: 0.15 },
    finance:          { AT: 0.35, RT: 0.25, AM: 0.25, PE: 0.15 },
    public:           { SP: 0.35, SI: 0.30, PE: 0.25, AT: 0.10 },
    craft:            { TA: 0.35, PE: 0.35, SP: 0.20, AT: 0.10 },
    sales:            { SI: 0.40, AM: 0.30, RT: 0.20, LP: 0.10 },
    entrepreneurship: { RT: 0.25, AM: 0.25, ID: 0.25, LP: 0.25 },
  }

  const weights = categoryWeights[career.category] ?? { AM: 0.25, PE: 0.25, AT: 0.25, LP: 0.25 }
  let score = 0
  for (const [dim, weight] of Object.entries(weights)) {
    score += (scores[dim as keyof DimensionScores] ?? 0) * (weight as number)
  }
  return Math.round(Math.min(98, score))
}

function getFitReason(career: Career, scores: DimensionScores): string {
  const reasons: Record<string, string> = {
    it: scores.AT > 70 ? '高い分析思考力がシステム開発に直結します' : 'ロジカルな問題解決力を活かせます',
    business: scores.LP > 60 ? '優れたリーダーシップで組織を牽引できます' : '戦略思考とコミュニケーション力が強みです',
    creative: scores.CT > 60 ? '独自の発想力でオリジナリティの高い仕事ができます' : 'クリエイティブな感性を活かせます',
    medical: scores.SI > 70 ? '高い社会的知性で患者との信頼関係を築けます' : '専門的な知識と継続力を発揮できます',
    finance: scores.RT > 60 ? 'リスク耐性が金融の不確実な判断に向いています' : '分析力と数的推論が金融分野で活きます',
    entrepreneurship: scores.AM > 70 ? '高い達成動機が起業の原動力になります' : '革新的な発想とリスク耐性が起業に向いています',
  }
  return reasons[career.category] ?? 'あなたのスキルセットと高い親和性があります'
}

function getCaution(career: Career, scores: DimensionScores): string {
  const cautions: Record<string, string> = {
    it: scores.TA < 40 ? '技術スキルの継続的習得が必要です' : '技術の急速な変化への対応が求められます',
    business: scores.LP < 40 ? 'リーダーシップスキルの強化が必要です' : '高いストレス耐性が求められます',
    entrepreneurship: scores.PE < 50 ? '長期的な継続力の強化が必要です' : '初期の収入不安定期を乗り越える覚悟が必要です',
    medical: '非常に長い学習期間（6年以上）が必要です',
    finance: scores.AT < 60 ? '高度な数量的分析力が必要です' : '競争が激しく、継続的な自己研鑽が必要です',
  }
  return cautions[career.category] ?? '継続的なスキルアップが成功の鍵です'
}
