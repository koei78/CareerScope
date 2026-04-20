import type { Metadata } from 'next'
import Link from 'next/link'
import { User, History, BarChart3, Settings, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'マイページ',
  description: 'CareerScopeマイページ - 診断履歴・詳細分析・設定',
}

export default function MyPage() {
  // This would be protected by Supabase auth in production
  const isLoggedIn = false

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center py-24">
        <div className="max-w-md w-full mx-auto px-4">
          <div className="card text-center">
            <div className="w-16 h-16 bg-[#1e3a5f]/5 rounded-full flex items-center justify-center mx-auto mb-5">
              <Lock className="w-8 h-8 text-[#1e3a5f]" />
            </div>
            <h1 className="text-2xl font-bold text-[#0f172a] mb-3">マイページ</h1>
            <p className="text-[#475569] text-sm mb-8 leading-relaxed">
              診断結果の保存・履歴閲覧・詳細分析にはログインが必要です。
              <br />
              登録は無料・30秒で完了します。
            </p>
            <div className="space-y-3">
              <button className="w-full btn-primary py-3">
                新規会員登録（無料）
              </button>
              <button className="w-full btn-outline py-3">
                ログイン
              </button>
            </div>
            <p className="text-[#94a3b8] text-xs mt-5">
              まず診断を受けてから登録することもできます
            </p>
            <Link href="/diagnosis" className="text-[#1e3a5f] text-sm underline">
              → 診断スタートへ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const MENU_ITEMS = [
    { icon: History, label: '診断履歴', href: '/mypage/history', desc: 'これまでの診断結果を管理' },
    { icon: BarChart3, label: '詳細分析', href: '/mypage/analysis', desc: 'キャリア分析レポートを確認' },
    { icon: Settings, label: '設定', href: '/mypage/settings', desc: 'プロフィール・通知設定' },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-14 h-14 bg-[#1e3a5f] rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">ようこそ</h1>
            <p className="text-[#475569] text-sm">フリープラン</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MENU_ITEMS.map(({ icon: Icon, label, href, desc }) => (
            <Link key={href} href={href} className="card-hover flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-[#1e3a5f]/5 rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-[#1e3a5f]" />
              </div>
              <div className="font-bold text-[#0f172a] mb-1">{label}</div>
              <div className="text-[#94a3b8] text-xs">{desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
