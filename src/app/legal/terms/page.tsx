import type { Metadata } from 'next'

export const metadata: Metadata = { title: '利用規約' }

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">利用規約</h1>
        <p className="text-[#94a3b8] text-sm mb-10">最終更新日: 2025年1月1日</p>
        <div className="card prose prose-sm max-w-none text-[#475569] leading-relaxed space-y-6">
          <section>
            <h2 className="font-bold text-[#0f172a] text-lg mb-3">第1条（適用）</h2>
            <p>本規約は、CareerScope（以下「当サービス」）の利用に関する条件を定めるものです。ユーザーは本規約に同意の上、当サービスを利用するものとします。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#0f172a] text-lg mb-3">第2条（サービスの利用）</h2>
            <p>当サービスは、キャリア適性に関する診断・分析機能を提供します。診断結果は統計的傾向に基づく推定であり、将来の成功を保証するものではありません。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#0f172a] text-lg mb-3">第3条（禁止事項）</h2>
            <p>ユーザーは以下の行為を行ってはなりません：当サービスへの不正アクセス、コンテンツの無断複製・転用、他ユーザーへの迷惑行為、法令違反行為。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#0f172a] text-lg mb-3">第4条（免責事項）</h2>
            <p>当サービスは診断結果の正確性・完全性を保証しません。診断結果を基にした判断・行動による損害について、当社は責任を負いません。</p>
          </section>
        </div>
      </div>
    </div>
  )
}
