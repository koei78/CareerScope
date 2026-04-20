import Link from 'next/link'
import { ArrowRight, Clock, Lock } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 bg-[#1e3a5f] relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      <div className="absolute -top-24 right-0 w-64 h-64 bg-[#d4a853]/10 rounded-full blur-3xl" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          あなたのキャリアの可能性を
          <br />
          <span className="text-[#d4a853]">今すぐ確認する</span>
        </h2>
        <p className="text-[#93c5fd] text-lg mb-10 leading-relaxed">
          30問・約10分の診断で、職業適性・年収予測・成長速度まで分かります。
          <br className="hidden sm:block" />
          会員登録不要・完全無料でお試しいただけます。
        </p>

        <Link
          href="/diagnosis"
          className="inline-flex items-center gap-3 px-10 py-5 bg-[#d4a853] text-[#0f172a] font-bold text-xl rounded-xl hover:bg-[#c49840] active:scale-[0.98] transition-all duration-200 shadow-xl mb-8"
        >
          無料で診断スタート
          <ArrowRight className="w-6 h-6" />
        </Link>

        <div className="flex flex-col sm:flex-row justify-center gap-6 text-white/60 text-sm">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            <span>約10分で完了</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            <span>個人情報の入力不要</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ArrowRight className="w-4 h-4" />
            <span>すぐに結果が見られる</span>
          </div>
        </div>
      </div>
    </section>
  )
}
