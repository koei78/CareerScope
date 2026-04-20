import Link from 'next/link'
import { Compass } from 'lucide-react'

const FOOTER_LINKS = {
  サービス: [
    { label: '診断とは', href: '/about' },
    { label: '診断スタート', href: '/diagnosis' },
    { label: '職業一覧', href: '/careers' },
  ],
  コンテンツ: [
    { label: 'ブログ', href: '/blog' },
    { label: 'お知らせ', href: '/news' },
    { label: 'お問い合わせ', href: '/contact' },
  ],
  法的情報: [
    { label: '利用規約', href: '/legal/terms' },
    { label: 'プライバシーポリシー', href: '/legal/privacy' },
    { label: '特定商取引法表記', href: '/legal/commerce' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-[#94a3b8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                <Compass className="w-4 h-4 text-[#d4a853]" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">CareerScope</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              行動経済学・認知科学・労働市場データを統合した、日本最高水準のキャリア診断サービス。
            </p>
            <p className="text-xs mt-4 text-[#64748b]">
              © 2025 CareerScope. All rights reserved.
            </p>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
