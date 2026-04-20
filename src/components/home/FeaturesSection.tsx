import { Brain, LineChart, Layers, Target, Clock, Award } from 'lucide-react'

const FEATURES = [
  {
    icon: Brain,
    title: '行動経済学×認知科学',
    description: '単純な「好き嫌い」ではなく、意思決定パターン・リスク耐性・時間割引率など科学的指標で分析。',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Layers,
    title: 'Big5 × 10次元スコアリング',
    description: '性格特性から行動履歴まで、10の分析軸で多角的に評価。偏った診断ではなく立体的なプロファイルを生成。',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: LineChart,
    title: '年収・成長率まで推定',
    description: '労働市場データ・専門職統計・成功者の行動特性を基に、現在〜10年後の年収推移を具体的に予測。',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Target,
    title: '15タイプ×100職業以上を評価',
    description: '起業家・エンジニア・コンサル・医師など15キャリアタイプ、100以上の具体的職業への適合度を算出。',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Clock,
    title: 'わずか10分で完了',
    description: '30問・約10分で診断完了。信頼度スコアと回答一貫性チェックで、回答の質も担保します。',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: Award,
    title: '成功確率スコアまで算出',
    description: '各職業における将来の成功確率スコアと、優先して伸ばすべきスキルを具体的に提示します。',
    color: 'bg-red-50 text-red-600',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1e3a5f]/5 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#1e3a5f] text-sm font-semibold">CareerScopeの特徴</span>
          </div>
          <h2 className="section-heading">
            「なんとなく」ではなく、
            <br />
            データで導き出す適性診断
          </h2>
          <p className="section-sub max-w-2xl mx-auto">
            エンタメ診断サイトとは根本的に異なる、研究ベースのアプローチで本当に役立つキャリア指針を提供します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="card-hover">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-[#0f172a] font-bold text-lg mb-2">{title}</h3>
              <p className="text-[#475569] text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
