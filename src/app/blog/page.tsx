import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ブログ・コラム',
  description: 'キャリア設計・転職・年収アップに関するコラムと分析記事',
}

const POSTS = [
  {
    slug: 'high-income-habits',
    category: '年収研究',
    title: '高収入者に共通する7つの意思決定パターン',
    excerpt: '行動経済学の観点から分析した、1,000万円以上の年収を達成している人に共通する思考・行動の特徴を解説します。',
    date: '2025-01-15',
    readTime: '8分',
  },
  {
    slug: 'career-change-guide',
    category: 'キャリア転換',
    title: '30代でのキャリアチェンジ完全ガイド：成功率を上げる5つの戦略',
    excerpt: '統計データと実例から見る、30代からの職種転換で成功するためのロードマップと具体的な準備方法。',
    date: '2025-01-10',
    readTime: '12分',
  },
  {
    slug: 'big5-career',
    category: '性格診断',
    title: 'Big5パーソナリティと向いている職業の関係性',
    excerpt: '心理学研究に基づいて、Big5の各特性（開放性・誠実性・外向性・協調性・神経症傾向）と職業適性の科学的な関係を解説。',
    date: '2025-01-05',
    readTime: '10分',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="section-heading mb-3">ブログ・コラム</h1>
          <p className="section-sub">キャリア科学の最前線から、実践的な知識を届けます</p>
        </div>

        <div className="space-y-5">
          {POSTS.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card-hover block">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge bg-[#1e3a5f]/5 text-[#1e3a5f] text-xs">{post.category}</span>
                    <span className="text-[#94a3b8] text-xs">読了 {post.readTime}</span>
                  </div>
                  <h2 className="font-bold text-[#0f172a] text-lg mb-2 leading-snug">{post.title}</h2>
                  <p className="text-[#475569] text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <span className="text-[#94a3b8] text-xs">{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
