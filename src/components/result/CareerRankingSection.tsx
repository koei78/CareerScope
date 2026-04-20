'use client'

import { useState } from 'react'
import type { DimensionScores } from '@/types/diagnosis'
import { rankCareersForUser } from '@/lib/diagnosis/careers'
import { CAREER_CATEGORY_LABELS } from '@/types/career'
import type { CareerCategory } from '@/types/career'
import { formatIncome } from '@/lib/utils'
import { ChevronDown, ChevronUp, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  scores: DimensionScores
}

const GROWTH_LABELS: Record<string, string> = {
  growing: '📈 成長中',
  stable: '➡️ 安定',
  declining: '📉 縮小傾向',
}

export function CareerRankingSection({ scores }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<CareerCategory | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const allRanked = rankCareersForUser(scores)
  const categories = Object.keys(CAREER_CATEGORY_LABELS) as CareerCategory[]

  const filtered = selectedCategory === 'all'
    ? allRanked.slice(0, 10)
    : allRanked.filter(item => item.career.category === selectedCategory).slice(0, 5)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-[#0f172a] text-xl">おすすめ職業ランキング</h3>
        <span className="badge bg-[#1e3a5f]/5 text-[#1e3a5f] text-xs">
          {filtered.length}件表示
        </span>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={cn(
            'badge text-xs transition-all',
            selectedCategory === 'all'
              ? 'bg-[#1e3a5f] text-white'
              : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]',
          )}
        >
          すべて TOP10
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              'badge text-xs transition-all',
              selectedCategory === cat
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]',
            )}
          >
            {CAREER_CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Career list */}
      <div className="space-y-3">
        {filtered.map((item, i) => (
          <div key={item.career.id} className="border border-[#e2e8f0] rounded-xl overflow-hidden">
            <button
              className="w-full text-left p-4 hover:bg-[#f8f9fc] transition-colors"
              onClick={() => setExpanded(expanded === item.career.id ? null : item.career.id)}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0',
                  i === 0 ? 'bg-[#d4a853] text-[#0f172a]'
                    : i === 1 ? 'bg-[#94a3b8] text-white'
                    : i === 2 ? 'bg-[#b45309] text-white'
                    : 'bg-[#f1f5f9] text-[#64748b]',
                )}>
                  {i + 1}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[#0f172a] text-sm">{item.career.name}</div>
                  <div className="text-xs text-[#94a3b8] mt-0.5">
                    {CAREER_CATEGORY_LABELS[item.career.category]} ·{' '}
                    {GROWTH_LABELS[item.career.growthOutlook]}
                  </div>
                </div>

                {/* Score */}
                <div className="text-right flex-shrink-0">
                  <div className="text-lg font-bold text-[#1e3a5f]">
                    {item.aptitudeScore}
                    <span className="text-xs text-[#94a3b8] font-normal">点</span>
                  </div>
                  <div className="text-xs text-[#94a3b8]">適性スコア</div>
                </div>

                <div className="flex-shrink-0 text-[#94a3b8]">
                  {expanded === item.career.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>
            </button>

            {/* Expanded detail */}
            {expanded === item.career.id && (
              <div className="px-4 pb-4 pt-2 border-t border-[#e2e8f0] bg-[#f8f9fc]">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="text-center p-2 bg-white rounded-lg border border-[#e2e8f0]">
                    <div className="text-xs text-[#94a3b8] mb-1">成功確率</div>
                    <div className="font-bold text-[#059669]">{item.successProbability}%</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-[#e2e8f0]">
                    <div className="text-xs text-[#94a3b8] mb-1">推定年収中央値</div>
                    <div className="font-bold text-[#1e3a5f] text-sm">{formatIncome(item.estimatedMedianIncome)}</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-[#e2e8f0]">
                    <div className="text-xs text-[#94a3b8] mb-1">到達年数</div>
                    <div className="font-bold text-[#0f172a]">{item.career.avgYearsToReach}年</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg border border-[#e2e8f0]">
                    <div className="text-xs text-[#94a3b8] mb-1">需要見通し</div>
                    <div className="font-bold text-[#0f172a] text-xs">{GROWTH_LABELS[item.career.growthOutlook]}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div className="p-3 bg-[#f0fdf4] rounded-lg">
                    <div className="text-xs font-semibold text-[#059669] mb-1">向いている理由</div>
                    <div className="text-xs text-[#475569]">{item.fitReason}</div>
                  </div>
                  <div className="p-3 bg-[#fff7ed] rounded-lg">
                    <div className="text-xs font-semibold text-[#d97706] mb-1">注意点</div>
                    <div className="text-xs text-[#475569]">{item.caution}</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-[#475569] mb-2">必要スキル</div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.career.requiredSkills.map(skill => (
                      <span key={skill} className="badge bg-[#e2e8f0] text-[#475569] text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
