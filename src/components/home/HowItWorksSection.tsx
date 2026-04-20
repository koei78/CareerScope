import { ClipboardList, Cpu, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const STEPS = [
  {
    step: '01',
    icon: ClipboardList,
    title: '30問に答える',
    description: '経営判断シナリオ・行動経済学・認知能力・性格特性の4ジャンル。約10分で完了します。',
    note: 'スマホ・PCどちらでも快適に回答',
  },
  {
    step: '02',
    icon: Cpu,
    title: 'AIが多角的に分析',
    description: '10次元スコアを算出し、15キャリアタイプとの類似度・年収・成長率を計算します。',
    note: 'コサイン類似度アルゴリズム + 統計モデル',
  },
  {
    step: '03',
    icon: BarChart3,
    title: '詳細レポートを確認',
    description: '職業タイプTOP3・おすすめ職業TOP10・年収予測・強み/弱みを視覚的に確認できます。',
    note: 'グラフ・レーダーチャートで一目瞭然',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-[#f8f9fc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#d4a853]/10 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#a07830] text-sm font-semibold">使い方</span>
          </div>
          <h2 className="section-heading">たった3ステップで完了</h2>
          <p className="section-sub">
            登録不要・無料でスタートできます。より詳細な分析は会員登録後に利用可能です。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {STEPS.map(({ step, icon: Icon, title, description, note }, i) => (
            <div key={step} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(100%-12px)] w-6 z-10">
                  <ArrowRight className="w-5 h-5 text-[#94a3b8]" />
                </div>
              )}

              <div className="card text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1e3a5f] rounded-2xl mb-4 mx-auto relative">
                  <Icon className="w-7 h-7 text-white" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#d4a853] rounded-full flex items-center justify-center text-[#0f172a] text-xs font-bold">
                    {i + 1}
                  </span>
                </div>
                <div className="text-[#94a3b8] text-xs font-mono mb-2">{step}</div>
                <h3 className="font-bold text-[#0f172a] text-xl mb-3">{title}</h3>
                <p className="text-[#475569] text-sm leading-relaxed mb-3">{description}</p>
                <span className="badge bg-[#f1f5f9] text-[#64748b] text-xs">{note}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/diagnosis" className="btn-primary text-base px-10 py-4 inline-flex">
            今すぐ無料で診断する
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-[#94a3b8] text-sm mt-3">会員登録なし・無料・約10分</p>
        </div>
      </div>
    </section>
  )
}
