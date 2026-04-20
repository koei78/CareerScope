'use client'

import { SECTIONS } from '@/lib/diagnosis/questions'

interface Props {
  current: number
  total: number
}

export function ProgressBar({ current, total }: Props) {
  const progress = (current / total) * 100

  const currentSection = SECTIONS.find(
    s => current >= s.range[0] && current <= s.range[1],
  )

  return (
    <div className="w-full">
      {/* Section label */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#1e3a5f] bg-[#1e3a5f]/5 rounded-full px-3 py-1">
            Section {currentSection?.id}: {currentSection?.label}
          </span>
        </div>
        <span className="text-sm text-[#94a3b8] font-mono">
          {current} / {total}
        </span>
      </div>

      {/* Progress track */}
      <div className="score-bar-track h-2 bg-[#e2e8f0]">
        <div
          className="score-bar-fill bg-gradient-to-r from-[#1e3a5f] to-[#3b82f6] transition-all duration-500"
          style={{ width: `${progress}%`, height: '100%' }}
        />
      </div>

      {/* Section dots */}
      <div className="flex justify-between mt-3 px-0">
        {SECTIONS.map(section => {
          const sectionProgress = current >= section.range[1]
            ? 'done'
            : current >= section.range[0]
            ? 'active'
            : 'pending'

          return (
            <div key={section.id} className="flex flex-col items-center gap-1">
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  sectionProgress === 'done'
                    ? 'bg-[#059669]'
                    : sectionProgress === 'active'
                    ? 'bg-[#1e3a5f] ring-2 ring-[#1e3a5f]/30'
                    : 'bg-[#e2e8f0]'
                }`}
              />
              <span className="text-[10px] text-[#94a3b8] hidden sm:block">
                {section.id}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
