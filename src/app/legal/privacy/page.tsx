import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'プライバシーポリシー' }

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">プライバシーポリシー</h1>
        <p className="text-[#94a3b8] text-sm mb-10">最終更新日: 2025年1月1日</p>
        <div className="card space-y-6 text-[#475569] leading-relaxed">
          <section>
            <h2 className="font-bold text-[#0f172a] text-lg mb-3">収集する情報</h2>
            <p>当サービスは、診断回答データ（匿名化）、アクセスログ（IPアドレス、ブラウザ情報）、会員登録時のメールアドレス（任意）を収集します。個人を特定できる情報の入力は一切不要です。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#0f172a] text-lg mb-3">情報の利用目的</h2>
            <p>収集した情報はサービス提供・品質改善・統計分析（匿名化）にのみ使用します。第三者への販売・提供は行いません。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#0f172a] text-lg mb-3">Cookieの使用</h2>
            <p>当サービスはセッション管理・UX改善のためにCookieを使用します。ブラウザの設定でCookieを無効化することが可能ですが、一部機能が制限される場合があります。</p>
          </section>
          <section>
            <h2 className="font-bold text-[#0f172a] text-lg mb-3">お問い合わせ</h2>
            <p>個人情報に関するお問い合わせは <a href="mailto:privacy@careerscope.jp" className="text-[#1e3a5f] underline">privacy@careerscope.jp</a> までご連絡ください。</p>
          </section>
        </div>
      </div>
    </div>
  )
}
