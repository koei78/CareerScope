import type { Metadata } from 'next'
import { Mail, MessageSquare, Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'CareerScopeへのお問い合わせ・法人プランのご相談はこちら',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="section-heading mb-3">お問い合わせ</h1>
          <p className="section-sub">ご質問・法人プランのご相談はお気軽にどうぞ</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            { icon: MessageSquare, title: '一般お問い合わせ', desc: 'サービスに関するご質問・ご意見' },
            { icon: Building2, title: '法人向けプラン相談', desc: '採用・HR活用の導入相談' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card text-center">
              <div className="w-12 h-12 bg-[#1e3a5f]/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-[#1e3a5f]" />
              </div>
              <h2 className="font-bold text-[#0f172a] mb-1">{title}</h2>
              <p className="text-[#94a3b8] text-xs">{desc}</p>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="font-bold text-[#0f172a] text-xl mb-6">お問い合わせフォーム</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1.5">お名前</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1.5">メールアドレス</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
                placeholder="example@mail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1.5">お問い合わせ種別</label>
              <select className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]">
                <option>一般お問い合わせ</option>
                <option>法人プランのご相談</option>
                <option>バグ・不具合の報告</option>
                <option>その他</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0f172a] mb-1.5">メッセージ</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 border border-[#e2e8f0] rounded-xl bg-white text-[#0f172a] text-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f] resize-none"
                placeholder="お問い合わせ内容をご記入ください"
              />
            </div>
            <button type="submit" className="w-full btn-primary py-3">
              送信する
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-[#94a3b8] text-sm">
          <Mail className="w-4 h-4 inline mr-1" />
          直接メールの場合: <a href="mailto:hello@careerscope.jp" className="text-[#1e3a5f] underline">hello@careerscope.jp</a>
        </div>
      </div>
    </div>
  )
}
