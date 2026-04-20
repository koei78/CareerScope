import type { Metadata } from 'next'
import Link from 'next/link'
import { CAREERS } from '@/lib/diagnosis/careers'
import { CAREER_CATEGORY_LABELS } from '@/types/career'
import { formatIncome } from '@/lib/utils'
import type { CareerCategory } from '@/types/career'
import { TrendingUp, Minus, TrendingDown } from 'lucide-react'

export const metadata: Metadata = {
  title: '職業一覧',
  description: 'CareerScopeが分析対象とする職業一覧。各職業の年収・必要スキル・キャリアパスを詳しく解説。',
}

const GROWTH_ICONS = {
  growing: TrendingUp,
  stable: Minus,
  declining: TrendingDown,
}

const GROWTH_COLORS = {
  growing: 'text-[#059669] bg-green-50',
  stable: 'text-[#475569] bg-slate-50',
  declining: 'text-red-500 bg-red-50',
}

const GROWTH_LABELS = { growing: '成長中', stable: '安定', declining: '縮小傾向' }

const categories = Object.keys(CAREER_CATEGORY_LABELS) as CareerCategory[]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-12">
          <h1 className="section-heading mb-3">職業一覧</h1>
          <p className="section-sub">
            CareerScopeが適性評価する{CAREERS.length}職業の詳細情報
          </p>
        </div>

        {categories.map(category => {
          const categoryCareers = CAREERS.filter(c => c.category === category)
          if (categoryCareers.length === 0) return null

          return (
            <section key={category} className="mb-12">
              <h2 className="font-bold text-[#0f172a] text-xl mb-5 flex items-center gap-2">
                <span className="w-1 h-6 bg-[#1e3a5f] rounded-full" />
                {CAREER_CATEGORY_LABELS[category]}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryCareers.map(career => {
                  const GrowthIcon = GROWTH_ICONS[career.growthOutlook]
                  return (
                    <div key={career.id} className="card-hover">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-[#0f172a]">{career.name}</h3>
                        <span className={`badge text-xs flex items-center gap-1 ${GROWTH_COLORS[career.growthOutlook]}`}>
                          <GrowthIcon className="w-3 h-3" />
                          {GROWTH_LABELS[career.growthOutlook]}
                        </span>
                      </div>
                      <p className="text-[#475569] text-xs mb-4 leading-relaxed">{career.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-[#94a3b8] text-xs">中央値年収</span>
                          <div className="font-bold text-[#1e3a5f]">{formatIncome(career.medianIncome)}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-[#94a3b8] text-xs">到達年数</span>
                          <div className="font-bold text-[#0f172a]">{career.avgYearsToReach}年〜</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}

        <div className="text-center mt-12">
          <Link href="/diagnosis" className="btn-primary inline-flex text-base px-8 py-4">
            診断して自分に合う職業を見つける →
          </Link>
        </div>
      </div>
    </div>
  )
}
