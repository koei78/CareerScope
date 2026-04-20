import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Brain, LineChart, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: '診断とは',
  description: 'CareerScopeの診断手法・科学的根拠・分析ロジックについて詳しく解説します。',
}

const RESEARCH_BASES = [
  {
    icon: Brain,
    title: 'Big5パーソナリティ理論',
    desc: '心理学で最も検証されたパーソナリティモデル。開放性・誠実性・外向性・協調性・情緒安定性の5次元で個人を分析。',
  },
  {
    icon: LineChart,
    title: '行動経済学・意思決定理論',
    desc: 'カーネマン・タラーの研究に基づく損失回避・時間割引率・確率判断の測定。意思決定パターンからリスク耐性を推定。',
  },
  {
    icon: Award,
    title: 'キャリア成功統計・労働市場データ',
    desc: '専門職年収分布・起業成功率・職業別収入推移など実際の統計データと研究を基に年収・成長率モデルを構築。',
  },
  {
    icon: BookOpen,
    title: 'IQと年収相関研究・教育経済学',
    desc: 'ハーンシュタインとマレーの研究、教育経済学の成果を参考に、認知能力スコアと年収の相関を推定モデルに統合。',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#1e3a5f]/5 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#1e3a5f] text-sm font-semibold">科学的根拠</span>
          </div>
          <h1 className="section-heading mb-4">
            なぜ「CareerScope」の
            <br />
            診断は信頼できるのか
          </h1>
          <p className="section-sub max-w-2xl mx-auto">
            単なる「好き嫌い診断」ではありません。行動経済学・認知科学・労働市場統計を
            統合した、研究ベースのキャリア適性推定モデルです。
          </p>
        </div>

        {/* 10 dimensions */}
        <div className="card mb-10">
          <h2 className="font-bold text-[#0f172a] text-2xl mb-2">10次元スコアリングシステム</h2>
          <p className="text-[#475569] text-sm mb-6">
            単一指標ではなく、10の異なる次元から多角的にキャリア適性を評価します。
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { code: 'RT', name: 'リスク耐性', desc: '不確実性への許容度・挑戦力' },
              { code: 'AT', name: '分析思考', desc: '論理・数的・構造化思考' },
              { code: 'LP', name: 'リーダーシップ', desc: '人を動かす影響力・組織牽引力' },
              { code: 'ID', name: '革新推進力', desc: '新アイデア創出・実行力' },
              { code: 'SI', name: '社会的知性', desc: '対人理解・共感・コミュ力' },
              { code: 'TA', name: '技術適性', desc: '専門技術・ツール習熟適性' },
              { code: 'SP', name: '安定志向', desc: '秩序・継続・安定を好む傾向' },
              { code: 'AM', name: '達成動機', desc: '高目標設定・内発的動機' },
              { code: 'CT', name: '創造思考', desc: '独自発想・審美眼・表現力' },
              { code: 'PE', name: '継続力', desc: '長期的粘り強さ・持続力' },
            ].map(({ code, name, desc }) => (
              <div key={code} className="flex items-center gap-3 p-3 bg-[#f8f9fc] rounded-xl">
                <span className="w-10 h-10 bg-[#1e3a5f] text-white rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {code}
                </span>
                <div>
                  <div className="font-semibold text-[#0f172a] text-sm">{name}</div>
                  <div className="text-[#94a3b8] text-xs">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research bases */}
        <div className="mb-10">
          <h2 className="font-bold text-[#0f172a] text-2xl mb-6">統合している研究分野</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RESEARCH_BASES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card-hover">
                <div className="w-10 h-10 bg-[#1e3a5f]/5 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#1e3a5f]" />
                </div>
                <h3 className="font-bold text-[#0f172a] text-base mb-2">{title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-5 bg-[#fff7ed] rounded-xl border border-orange-100 mb-10">
          <h3 className="font-semibold text-[#92400e] mb-2">ご注意</h3>
          <p className="text-[#92400e] text-sm leading-relaxed">
            本診断は統計的傾向に基づく推定であり、個人の将来を確実に予測するものではありません。
            診断結果は一つの参考指標として活用し、最終的なキャリア判断は専門家（キャリアカウンセラー等）への
            相談や自己分析と組み合わせることを推奨します。
          </p>
        </div>

        <div className="text-center">
          <Link href="/diagnosis" className="btn-primary text-base px-10 py-4 inline-flex">
            診断を受けてみる
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
