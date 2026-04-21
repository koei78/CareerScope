import type { CareerTypeId } from '@/types/diagnosis'

export type CareerPersonality = {
  tagline: string      // one dramatic shareable line
  rarity: number       // % of test-takers with this type (1–20)
  famousPeople: string // 2 famous examples
  keyword: string      // short archetype word shown in badge
}

export const CAREER_PERSONALITY: Record<CareerTypeId, CareerPersonality> = {
  entrepreneur: {
    tagline: '誰も踏み込まない道を切り開く、時代の開拓者',
    rarity: 5,
    famousPeople: '孫正義・堀江貴文',
    keyword: '🔥 開拓者',
  },
  executive: {
    tagline: '人を動かし、組織という舞台で大きな夢を現実にする指揮者',
    rarity: 7,
    famousPeople: '柳井正・稲盛和夫',
    keyword: '👑 指揮者',
  },
  specialist: {
    tagline: '誰も到達できない深さで、世界の最前線に立ち続ける職人',
    rarity: 11,
    famousPeople: '山中伸弥・本庶佑',
    keyword: '🎯 職人',
  },
  sales: {
    tagline: '人の心を動かすことが天才的にうまい、天性のコミュニケーター',
    rarity: 13,
    famousPeople: '藤田田・ジョルダン・ベルフォート',
    keyword: '💬 天才交渉人',
  },
  researcher: {
    tagline: '答えのない問いに挑み続ける、知の最前線の探求者',
    rarity: 6,
    famousPeople: '田中耕一・キュリー夫人',
    keyword: '🔬 探求者',
  },
  creator: {
    tagline: '世界の見え方を変える作品を生み出す、唯一無二のアーティスト',
    rarity: 9,
    famousPeople: '宮崎駿・村上春樹',
    keyword: '🎨 ビジョナリー',
  },
  engineer: {
    tagline: 'コードと技術で未来を設計する、時代を動かすビルダー',
    rarity: 11,
    famousPeople: 'Linus Torvalds・Dennis Ritchie',
    keyword: '⚡ ビルダー',
  },
  consultant: {
    tagline: '問題の本質を一瞬で見抜き、最短ルートで解決する戦略家',
    rarity: 8,
    famousPeople: '大前研一・マッキンゼー出身者',
    keyword: '🧠 戦略家',
  },
  finance: {
    tagline: '数字の裏に隠れたチャンスを掴む、究極の合理主義者',
    rarity: 6,
    famousPeople: 'ウォーレン・バフェット・村上世彰',
    keyword: '💹 数字の魔術師',
  },
  medical: {
    tagline: '命と向き合い、人の最も大切なものを守り続ける守護者',
    rarity: 4,
    famousPeople: '手塚治虫（医師免許）・日野原重明',
    keyword: '🏥 守護者',
  },
  publicServant: {
    tagline: '社会の土台を支え、静かに確実に世界を守り続ける存在',
    rarity: 6,
    famousPeople: '池田勇人・バラク・オバマ',
    keyword: '🏛️ 守護神',
  },
  craftsman: {
    tagline: '本物の技術が生み出す価値は、どんな時代でも色あせない',
    rarity: 5,
    famousPeople: '本田宗一郎・宮大工 西岡常一',
    keyword: '🔧 本物の職人',
  },
  educator: {
    tagline: '知識の火を次の世代に灯し、社会の知的土台を作るメンター',
    rarity: 7,
    famousPeople: '池上彰・アルベルト・アインシュタイン',
    keyword: '📚 点火者',
  },
  marketer: {
    tagline: '人の心を動かすストーリーで、市場そのものを作り出す',
    rarity: 6,
    famousPeople: '澤田秀雄・スティーブ・ジョブズ（マーケ視点）',
    keyword: '📣 ストーリーテラー',
  },
  producer: {
    tagline: '天才たちを束ね、ゼロから奇跡を生み出すオーケストラの指揮者',
    rarity: 3,
    famousPeople: '秋元康・ジェリー・ブラッカイマー',
    keyword: '🎬 奇跡を生む人',
  },
  nurse: {
    tagline: 'その場にいるだけで人に安心を与える、最も人間的な専門家',
    rarity: 5,
    famousPeople: 'ナイチンゲール・日野原重明（看護教育）',
    keyword: '💊 癒しの専門家',
  },
  webDesigner: {
    tagline: '美しさと使いやすさで世界を少しずつ変えていくデザイン哲学者',
    rarity: 7,
    famousPeople: '佐藤可士和・ジョナサン・アイブ',
    keyword: '🖥️ デザイン哲学者',
  },
  hrSpecialist: {
    tagline: '人の可能性を誰よりも深く信じ、それを引き出すことに天才的',
    rarity: 4,
    famousPeople: 'アリエル・デ・ゴールド・パタゴニアCHRO',
    keyword: '🤝 人材発掘者',
  },
  lawyer: {
    tagline: '論理と正義を武器に、人の権利を守る法廷の守護神',
    rarity: 4,
    famousPeople: '橋下徹・ルース・ベイダー・ギンズバーグ',
    keyword: '⚖️ 正義の守護神',
  },
  projectManager: {
    tagline: '混沌をチームの力で確実な成果に変える、組織の司令塔',
    rarity: 8,
    famousPeople: '山崎直子（宇宙飛行士）・野村克也',
    keyword: '📋 司令塔',
  },
  writer: {
    tagline: '言葉だけで世界を変える力を持つ、最も危険なクリエイター',
    rarity: 6,
    famousPeople: '又吉直樹・林真理子',
    keyword: '✍️ 言葉の魔術師',
  },
  counselor: {
    tagline: 'あなたの話を世界で一番深く聞いてくれる、心の伴走者',
    rarity: 5,
    famousPeople: 'カール・ロジャーズ・河合隼雄',
    keyword: '🫂 心の伴走者',
  },
  chef: {
    tagline: '食という体験で人の心を幸せにする、五感の魔法使い',
    rarity: 4,
    famousPeople: '三國清三・ジョエル・ロブション',
    keyword: '👨‍🍳 五感の魔法使い',
  },
  beautician: {
    tagline: 'その人の中に眠る美しさを引き出す、変身の魔法師',
    rarity: 3,
    famousPeople: 'ヴィダル・サスーン・辻口博啓',
    keyword: '💇 変身の魔法師',
  },
  socialWorker: {
    tagline: '誰も気づかない社会の課題に気づき、静かに世界を変える変革者',
    rarity: 4,
    famousPeople: 'マザー・テレサ・渋沢栄一',
    keyword: '🌱 社会の変革者',
  },
}
