'use client'

import { Lightbulb, ArrowRight, AlertTriangle, TrendingUp } from 'lucide-react'
import type { CareerTypeId } from '@/types/diagnosis'
import { CAREER_TYPE_LABELS, CAREER_TYPE_ICONS } from '@/types/diagnosis'
import { CAREER_ADVICE } from '@/lib/diagnosis/advice'

interface Props {
  topCareerType: CareerTypeId
}

export function AdviceSection({ topCareerType }: Props) {
  const advice = CAREER_ADVICE[topCareerType]
  if (!advice) return null

  return (
    <div className="space-y-4">
      {/* Strategy */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-[#d4a853]" />
          <h3 className="font-bold text-[#0f172a] text-lg">
            {CAREER_TYPE_ICONS[topCareerType]} {CAREER_TYPE_LABELS[topCareerType]}のキャリア戦略
          </h3>
        </div>
        <p className="text-[#475569] text-sm leading-relaxed">{advice.strategy}</p>
      </div>

      {/* Action Steps */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="w-5 h-5 text-[#1e3a5f]" />
          <h3 className="font-bold text-[#0f172a] text-lg">今すぐ始める3つのアクション</h3>
        </div>
        <div className="space-y-3">
          {advice.actions.map((action, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                {i + 1}
              </div>
              <p className="text-[#475569] text-sm leading-relaxed">{action}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Paths */}
      <div className="card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-[#16a34a]" />
          <h3 className="font-bold text-[#0f172a] text-lg">あなたの上のステージ</h3>
        </div>
        <div className="space-y-3">
          {advice.growthPaths.map((path) => (
            <div key={path.id} className="flex items-start gap-3 p-3 rounded-xl bg-[#f8f9fc] border border-[#e2e8f0]">
              <div className="text-xl flex-shrink-0">{CAREER_TYPE_ICONS[path.id]}</div>
              <div>
                <div className="font-semibold text-[#0f172a] text-sm">{path.label}</div>
                <div className="text-[#64748b] text-xs mt-0.5">{path.reason}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Watch Out */}
      <div className="flex items-start gap-3 p-4 bg-[#fefce8] border border-[#fde047]/40 rounded-xl">
        <AlertTriangle className="w-4 h-4 text-[#ca8a04] flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-semibold text-[#92400e] text-sm mb-1">注意ポイント</div>
          <p className="text-[#78350f] text-xs leading-relaxed">{advice.watchOut}</p>
        </div>
      </div>
    </div>
  )
}
