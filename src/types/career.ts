export type CareerCategory =
  | 'it' | 'business' | 'creative' | 'medical'
  | 'education' | 'finance' | 'public' | 'craft'
  | 'sales' | 'entrepreneurship'

export const CAREER_CATEGORY_LABELS: Record<CareerCategory, string> = {
  it: 'IT系',
  business: 'ビジネス系',
  creative: 'クリエイティブ系',
  medical: '医療・福祉系',
  education: '教育・研究系',
  finance: '金融系',
  public: '公務系',
  craft: '現場技能系',
  sales: '営業系',
  entrepreneurship: '起業系',
}

export type Career = {
  id: string
  slug: string
  name: string
  category: CareerCategory
  description: string
  medianIncome: number
  incomeRange: { min: number; max: number }
  requiredSkills: string[]
  avgYearsToReach: number
  growthOutlook: 'growing' | 'stable' | 'declining'
  workStyle: string[]
  careerPath: string[]
  relatedCareers: string[]
}

export type CareerRankItem = {
  career: Career
  aptitudeScore: number
  successProbability: number
  fitReason: string
  caution: string
  estimatedMedianIncome: number
}
