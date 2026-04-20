import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Zap, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: '料金プラン',
  description: 'CareerScopeの料金プラン。無料版から詳細分析・法人向けプランまで。',
}

const PLANS = [
  {
    id: 'free',
    name: 'フリー',
    price: '¥0',
    period: '永久無料',
    description: '基本診断を無料で体験',
    icon: '🎯',
    badge: null,
    features: [
      '基本30問診断',
      '職業タイプTOP3表示',
      'おすすめ職業TOP10',
      '推定年収中央値',
      'レーダーチャート表示',
      'SNSシェア機能',
    ],
    disabled: [],
    cta: '無料で始める',
    href: '/diagnosis',
    variant: 'outline' as const,
  },
  {
    id: 'pro',
    name: 'プロ',
    price: '¥1,980',
    period: '月額（税込）',
    description: '本格的なキャリア分析に',
    icon: '🚀',
    badge: '人気No.1',
    features: [
      '全30問 + 追加10問精度向上診断',
      '詳細分析レポートPDF',
      '診断履歴（無制限保存）',
      '年収推移グラフ（詳細）',
      '職業100件以上の詳細情報',
      '強み・弱みの成長プラン',
      '月1回の診断更新・再分析',
      '優先サポート',
    ],
    disabled: [],
    cta: 'プロプランを始める',
    href: '#',
    variant: 'primary' as const,
  },
  {
    id: 'enterprise',
    name: 'エンタープライズ',
    price: '要相談',
    period: '法人向け',
    description: '採用・人事評価・研修に',
    icon: '🏢',
    badge: null,
    features: [
      '複数メンバーの一括診断',
      '組織全体のプロファイル分析',
      '採用適性スコアリング',
      '部署別・役職別レポート',
      'CSV/APIデータエクスポート',
      '専任カスタマーサクセス',
      'ブランドカスタマイズ対応',
      'オンプレ/SSO対応',
    ],
    disabled: [],
    cta: 'お問い合わせ',
    href: '/contact',
    variant: 'outline' as const,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h1 className="section-heading mb-4">料金プラン</h1>
          <p className="section-sub">無料から始めて、必要に応じて深掘りできます</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => (
            <div
              key={plan.id}
              className={`rounded-2xl border-2 p-7 relative ${
                plan.id === 'pro'
                  ? 'border-[#1e3a5f] bg-white shadow-lg scale-[1.02]'
                  : 'border-[#e2e8f0] bg-white'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="badge bg-[#d4a853] text-[#0f172a] text-xs font-bold px-4 py-1 shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-3xl mb-3">{plan.icon}</div>
              <h2 className="font-bold text-[#0f172a] text-xl mb-1">{plan.name}</h2>
              <p className="text-[#94a3b8] text-sm mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-[#0f172a]">{plan.price}</span>
                <span className="text-[#94a3b8] text-sm ml-1">/ {plan.period}</span>
              </div>

              <Link
                href={plan.href}
                className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm mb-6 transition-all ${
                  plan.variant === 'primary'
                    ? 'bg-[#1e3a5f] text-white hover:bg-[#162d4a]'
                    : 'border-2 border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white'
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-2.5">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-[#475569]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 bg-white rounded-2xl border border-[#e2e8f0]">
          <Building2 className="w-10 h-10 text-[#1e3a5f] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0f172a] mb-2">法人・HR担当者の方へ</h2>
          <p className="text-[#475569] mb-6 max-w-xl mx-auto">
            採用スクリーニング・社員キャリア支援・研修プログラムとして活用いただける
            法人向けプランをご用意しています。
          </p>
          <Link href="/contact" className="btn-primary inline-flex">
            法人向けプランの詳細を見る
          </Link>
        </div>
      </div>
    </div>
  )
}
