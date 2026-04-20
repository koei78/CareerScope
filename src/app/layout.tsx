import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'CareerScope | あなたのキャリアを、科学する。',
    template: '%s | CareerScope',
  },
  description:
    '行動経済学・Big5・認知科学を統合した高精度キャリア診断。あなたの職業適性・推定年収・成長速度を30問で科学的に分析します。',
  keywords: ['キャリア診断', '職業適性', '年収予測', '適職', 'キャリアスコープ'],
  openGraph: {
    title: 'CareerScope | あなたのキャリアを、科学する。',
    description: '30問で分かる、あなたの職業適性と年収ポテンシャル',
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerScope | あなたのキャリアを、科学する。',
    description: '30問で分かる、あなたの職業適性と年収ポテンシャル',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
