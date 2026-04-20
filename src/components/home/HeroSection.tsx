import Link from 'next/link'
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react'

const TRUST_ITEMS = [
  { icon: Shield, label: '科学的根拠に基づく分析' },
  { icon: TrendingUp, label: '年収・成長率まで推定' },
  { icon: Users, label: '15職業タイプ×100職業以上' },
]

export function HeroSection() {
  return (
    <section className="relative bg-[#1e3a5f] overflow-hidden min-h-[90vh] flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#0d2040]" />

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#d4a853]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-48 -left-24 w-80 h-80 bg-[#3b82f6]/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#d4a853]/15 border border-[#d4a853]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 bg-[#d4a853] rounded-full animate-pulse-slow" />
            <span className="text-[#d4a853] text-sm font-medium">
              行動経済学 × Big5 × 労働市場データ 統合診断
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] tracking-tight mb-6">
            あなたのキャリアを、
            <br />
            <span className="text-[#d4a853]">科学する。</span>
          </h1>

          {/* Sub copy */}
          <p className="text-[#93c5fd] text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
            30問の診断で、あなたの職業適性・推定年収・5年後の姿を科学的に分析。
            <br className="hidden sm:block" />
            エンタメではない、本格的なキャリア科学ツールです。
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <Link
              href="/diagnosis"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d4a853] text-[#0f172a] font-bold text-lg rounded-xl hover:bg-[#c49840] active:scale-[0.98] transition-all duration-200 shadow-lg"
            >
              無料で診断スタート
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-lg rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              診断の仕組みを見る
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {TRUST_ITEMS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/70">
                <Icon className="w-4 h-4 text-[#d4a853] flex-shrink-0" />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating result preview card */}
      <div className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-72">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white text-sm font-semibold">診断結果プレビュー</span>
            <span className="badge bg-[#d4a853]/20 text-[#d4a853] text-xs">サンプル</span>
          </div>
          <div className="space-y-3">
            {[
              { label: 'ITエンジニア型', score: 94, color: 'bg-blue-400' },
              { label: 'コンサル型', score: 87, color: 'bg-[#d4a853]' },
              { label: '研究開発型', score: 81, color: 'bg-green-400' },
            ].map(({ label, score, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-white/80">{label}</span>
                  <span className="text-white font-semibold">{score}%</span>
                </div>
                <div className="score-bar-track h-2">
                  <div className={`score-bar-fill ${color}`} style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="text-xs text-white/60 mb-1">推定年収中央値</div>
            <div className="text-2xl font-bold text-white">820<span className="text-base font-normal text-white/60">万円</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}
