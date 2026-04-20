export type Dimension =
  | 'RT' | 'AT' | 'LP' | 'ID' | 'SI'
  | 'TA' | 'SP' | 'AM' | 'CT' | 'PE'

export const DIMENSION_LABELS: Record<Dimension, string> = {
  RT: 'リスク耐性',
  AT: '分析思考',
  LP: 'リーダーシップ',
  ID: '革新推進力',
  SI: '社会的知性',
  TA: '技術適性',
  SP: '安定志向',
  AM: '達成動機',
  CT: '創造思考',
  PE: '継続力',
}

export const DIMENSION_DESCRIPTIONS: Record<Dimension, string> = {
  RT: '不確実性を許容し、高リターンを求めて挑戦する能力',
  AT: '論理・数的・構造的に問題を分解する思考力',
  LP: '人を動かし、組織を方向づける影響力',
  ID: '新しいアイデアを生み出し、実行に移す推進力',
  SI: '他者を深く理解し、関係性を築く共感力',
  TA: '専門技術・ツール・システムへの習熟適性',
  SP: '秩序・安定・継続を好む傾向の強さ',
  AM: '高い目標を設定し、達成しようとする内発的動機',
  CT: '独自の発想・審美眼・表現力',
  PE: '長期的に粘り強く取り組み続ける持続力',
}

export type DimensionScores = Record<Dimension, number>

export type AnswerOption = {
  id: 'A' | 'B' | 'C' | 'D'
  text: string
  scores: Partial<DimensionScores>
}

export type Question = {
  id: number
  section: string
  sectionLabel: string
  question: string
  scenario?: string
  options: AnswerOption[]
  measureTypes: Dimension[]
}

export type CareerTypeId =
  | 'entrepreneur' | 'executive' | 'specialist' | 'sales'
  | 'researcher' | 'creator' | 'engineer' | 'consultant'
  | 'finance' | 'medical' | 'publicServant' | 'craftsman'
  | 'educator' | 'marketer' | 'producer'
  | 'nurse' | 'webDesigner' | 'hrSpecialist' | 'lawyer'
  | 'projectManager' | 'writer' | 'counselor' | 'chef'
  | 'beautician' | 'socialWorker'

export const CAREER_TYPE_LABELS: Record<CareerTypeId, string> = {
  entrepreneur: '起業家型',
  executive: '経営者型',
  specialist: '専門職型',
  sales: '営業型',
  researcher: '研究開発型',
  creator: 'クリエイター型',
  engineer: 'ITエンジニア型',
  consultant: 'コンサル型',
  finance: '金融型',
  medical: '医療型',
  publicServant: '公務型',
  craftsman: '現場技能型',
  educator: '教育型',
  marketer: 'マーケター型',
  producer: 'プロデューサー型',
  nurse: '医療・看護型',
  webDesigner: 'Webデザイナー型',
  hrSpecialist: '人事・HR型',
  lawyer: '法律・士業型',
  projectManager: 'プロジェクトマネージャー型',
  writer: 'ライター・編集型',
  counselor: 'カウンセラー・支援型',
  chef: '料理人・シェフ型',
  beautician: '美容師・スタイリスト型',
  socialWorker: '社会福祉・NPO型',
}

export const CAREER_TYPE_ICONS: Record<CareerTypeId, string> = {
  entrepreneur: '🚀',
  executive: '👔',
  specialist: '🎯',
  sales: '💼',
  researcher: '🔬',
  creator: '🎨',
  engineer: '💻',
  consultant: '📊',
  finance: '💹',
  medical: '🏥',
  publicServant: '🏛️',
  craftsman: '🔧',
  educator: '📚',
  marketer: '📣',
  producer: '🎬',
  nurse: '💊',
  webDesigner: '🖥️',
  hrSpecialist: '🤝',
  lawyer: '⚖️',
  projectManager: '📋',
  writer: '✍️',
  counselor: '🫂',
  chef: '👨‍🍳',
  beautician: '💇',
  socialWorker: '🌱',
}

export const CAREER_TYPE_DESCRIPTIONS: Record<CareerTypeId, string> = {
  entrepreneur: 'ゼロから事業を創り、市場を動かすリスクテイカー',
  executive: '組織を率いて、戦略的に事業を成長させるリーダー',
  specialist: '深い専門知識と技術で市場価値を高める職人的キャリア',
  sales: '人との関係構築と交渉力で成果を生み出すコミュニケーター',
  researcher: '知識の最前線を探求し、新たな発見をもたらすエクスプローラー',
  creator: '独自のビジョンと表現力で価値ある作品・体験を創造するアーティスト',
  engineer: '技術力とロジックで現実の問題を解決するビルダー',
  consultant: '高度な分析と知識で企業課題を解決するアドバイザー',
  finance: '数字とリスク管理で資本を最大化するストラテジスト',
  medical: '専門知識と人間性で人の健康・命を守るケアギバー',
  publicServant: '安定した基盤の中で社会・地域に貢献するサービスプロバイダー',
  craftsman: '現場での技術と経験で高品質な成果物を生み出すエキスパート',
  educator: '知識と情熱で次世代を育て、社会の知的基盤を作るメンター',
  marketer: '市場洞察と創造性でブランドと顧客をつなぐストーリーテラー',
  producer: '多様な才能をまとめ、プロジェクトを成功に導くオーケストレーター',
  nurse: '高い共感力と技術力で患者・利用者に寄り添う医療・ケアのプロ',
  webDesigner: '美的センスと技術でユーザーが使いたくなるデジタル体験を作るデザイナー',
  hrSpecialist: '人と組織をつなぎ、働きやすい環境と人材を育てるピープルマネージャー',
  lawyer: '法律の知識と論理で人々の権利と正義を守るプロフェッショナル',
  projectManager: '計画・調整・実行を通じてチームを成功へ導くコーディネーター',
  writer: '言葉と表現力で読者に価値を届けるコンテンツクリエイター',
  counselor: '傾聴と共感で人々の心に寄り添い、成長を支援するサポーター',
  chef: '創造性と技術で食という体験を通じて人を幸せにするアーティスト',
  beautician: '美と個性を引き出すセンスと技術で人々の自信を高めるスタイリスト',
  socialWorker: '社会課題に向き合い、人と地域のつながりをつくる変革者',
}

export type IncomeRange = '<300' | '300-600' | '600-1000' | '1000-3000' | '>3000'

export const INCOME_RANGE_LABELS: Record<IncomeRange, string> = {
  '<300': '300万円未満',
  '300-600': '300〜600万円',
  '600-1000': '600〜1,000万円',
  '1000-3000': '1,000〜3,000万円',
  '>3000': '3,000万円以上',
}

export type GrowthSpeed = 'slow' | 'medium' | 'fast'

export const GROWTH_SPEED_LABELS: Record<GrowthSpeed, string> = {
  slow: 'スタンダード成長',
  medium: '着実成長',
  fast: '急速成長',
}

export type CareerTypeMatch = {
  id: CareerTypeId
  matchScore: number
  rank: number
}

export type IncomeEstimate = {
  currentMedian: number
  year5: number
  year10: number
  range: IncomeRange
  annualGrowthRate: number
}

export type DiagnosisResult = {
  dimensionScores: DimensionScores
  careerTypeMatches: CareerTypeMatch[]
  topCareerType: CareerTypeId
  incomeEstimate: IncomeEstimate
  successProbability: number
  growthSpeed: GrowthSpeed
  reliabilityScore: number
  strengths: Dimension[]
  weaknesses: Dimension[]
  prioritySkills: string[]
}

export type DiagnosisAnswers = Record<number, 'A' | 'B' | 'C' | 'D'>
