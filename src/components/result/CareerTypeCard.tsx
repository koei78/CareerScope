'use client'

import type { CareerTypeMatch, CareerTypeId } from '@/types/diagnosis'
import {
  CAREER_TYPE_LABELS, CAREER_TYPE_ICONS, CAREER_TYPE_DESCRIPTIONS,
} from '@/types/diagnosis'
import { cn } from '@/lib/utils'

interface Props {
  match: CareerTypeMatch
  rank: number
}

const RANK_STYLES: Record<number, { card: string; badge: string; score: string }> = {
  1: {
    card: 'border-[#d4a853] bg-gradient-to-br from-[#fffbf0] to-white ring-1 ring-[#d4a853]/30',
    badge: 'bg-[#d4a853] text-[#0f172a]',
    score: 'text-[#1e3a5f]',
  },
  2: {
    card: 'border-[#94a3b8] bg-gradient-to-br from-[#f8fafc] to-white',
    badge: 'bg-[#64748b] text-white',
    score: 'text-[#475569]',
  },
  3: {
    card: 'border-[#b45309] bg-gradient-to-br from-[#fff7ed] to-white',
    badge: 'bg-[#b45309] text-white',
    score: 'text-[#b45309]',
  },
}

export function CareerTypeCard({ match, rank }: Props) {
  const styles = RANK_STYLES[rank] ?? RANK_STYLES[3]
  const id = match.id as CareerTypeId

  return (
    <div className={cn('rounded-2xl border-2 p-5 transition-all duration-200 hover:shadow-card-hover', styles.card)}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{CAREER_TYPE_ICONS[id]}</span>
          <div>
            <div className={cn('text-xs font-bold rounded-full px-2 py-0.5 inline-block mb-1', styles.badge)}>
              {rank === 1 ? '最適タイプ' : rank === 2 ? '第2タイプ' : '第3タイプ'}
            </div>
            <h3 className="font-bold text-[#0f172a] text-lg leading-tight">
              {CAREER_TYPE_LABELS[id]}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <div className={cn('text-3xl font-bold', styles.score)}>
            {match.matchScore}
            <span className="text-base font-normal text-[#94a3b8]">%</span>
          </div>
          <div className="text-xs text-[#94a3b8]">マッチ度</div>
        </div>
      </div>

      <p className="text-[#475569] text-sm leading-relaxed mb-4">
        {CAREER_TYPE_DESCRIPTIONS[id]}
      </p>

      {/* Match bar */}
      <div className="score-bar-track h-2 bg-[#e2e8f0]">
        <div
          className={cn(
            'score-bar-fill',
            rank === 1 ? 'bg-gradient-to-r from-[#d4a853] to-[#f59e0b]'
              : rank === 2 ? 'bg-gradient-to-r from-[#64748b] to-[#94a3b8]'
              : 'bg-gradient-to-r from-[#b45309] to-[#d97706]',
          )}
          style={{ width: `${match.matchScore}%`, height: '100%' }}
        />
      </div>
    </div>
  )
}
