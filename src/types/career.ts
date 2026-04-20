export type CareerCategory =
  | 'it' | 'business' | 'creative' | 'medical'
  | 'education' | 'finance' | 'public' | 'craft'
  | 'sales' | 'entrepreneurship' | 'legal' | 'welfare'

export const CAREER_CATEGORY_LABELS: Record<CareerCategory, string> = {
  it: 'IT系',
  business: 'ビジネス系',
  creative: 'クリエイティブ系',
  medical: '医療・看護系',
  education: '教育・研究系',
  finance: '金融系',
  public: '公務系',
  craft: '現場技能系',
  sales: '営業系',
  entrepreneurship: '起業系',
  legal: '法律・士業系',
  welfare: '福祉・支援系',
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
