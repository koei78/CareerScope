'use client'

import { Zap, ChevronRight } from 'lucide-react'

interface Props {
  skills: string[]
  successProbability: number
}

export function SkillsSection({ skills, successProbability }: Props) {
  return (
    <div className="card">
      <h3 className="font-bold text-[#0f172a] text-xl mb-6">優先スキルアップ指針</h3>

      {/* Success probability */}
      <div className="mb-6 p-4 bg-[#1e3a5f] rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[#93c5fd] text-xs font-medium mb-1">将来成功確率スコア</div>
            <div className="text-white text-4xl font-bold">
              {successProbability}
              <span className="text-xl text-[#93c5fd] font-normal">%</span>
            </div>
            <div className="text-[#93c5fd] text-xs mt-1">
              {successProbability >= 70 ? '✓ 高い成功ポテンシャルを持っています'
                : successProbability >= 50 ? '✓ 平均以上の成功ポテンシャルです'
                : '成長の余地が大きい段階です'}
            </div>
          </div>
          <div className="w-20 h-20 relative flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#ffffff20" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9" fill="none"
                stroke="#d4a853" strokeWidth="3"
                strokeDasharray={`${successProbability} ${100 - successProbability}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#d4a853]" />
            </div>
          </div>
        </div>
      </div>

      {/* Priority skills */}
      <div>
        <h4 className="font-semibold text-[#0f172a] text-base mb-4">
          今すぐ伸ばすべきスキル TOP5
        </h4>
        <div className="space-y-3">
          {skills.slice(0, 5).map((skill, i) => (
            <div key={skill} className="flex items-center gap-3 p-3 bg-[#f8f9fc] rounded-xl">
              <div className="w-7 h-7 bg-[#1e3a5f] rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{i + 1}</span>
              </div>
              <span className="text-sm font-medium text-[#0f172a] flex-1">{skill}</span>
              <ChevronRight className="w-4 h-4 text-[#94a3b8]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
