'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Compass } from 'lucide-react'

const NAV_ITEMS = [
  { label: '診断とは', href: '/about' },
  { label: '職業一覧', href: '/careers' },
  { label: '料金プラン', href: '/pricing' },
  { label: 'ブログ', href: '/blog' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e2e8f0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center group-hover:bg-[#162d4a] transition-colors">
              <Compass className="w-4 h-4 text-[#d4a853]" />
            </div>
            <span className="font-bold text-[#0f172a] text-lg tracking-tight">
              Career<span className="text-[#1e3a5f]">Scope</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#475569] text-sm font-medium hover:text-[#1e3a5f] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/mypage"
              className="text-sm font-medium text-[#475569] hover:text-[#1e3a5f] transition-colors"
            >
              ログイン
            </Link>
            <Link href="/diagnosis" className="btn-primary text-sm py-2 px-4">
              診断スタート
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#475569] hover:text-[#1e3a5f]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニュー"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#e2e8f0] bg-white px-4 py-4 space-y-3">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-[#475569] font-medium py-2 hover:text-[#1e3a5f] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[#e2e8f0] flex flex-col gap-2">
            <Link
              href="/mypage"
              className="btn-outline text-sm py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              ログイン
            </Link>
            <Link
              href="/diagnosis"
              className="btn-primary text-sm py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              診断スタート（無料）
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
