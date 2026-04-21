import type { CareerTypeId } from '@/types/diagnosis'
import { CAREER_PERSONALITY } from '@/lib/diagnosis/personality'

interface Props {
  topCareerType: CareerTypeId
}

export function PersonalityBadge({ topCareerType }: Props) {
  const p = CAREER_PERSONALITY[topCareerType]
  if (!p) return null

  const rarityLabel = p.rarity <= 5
    ? `上位 ${p.rarity}% の超稀少タイプ`
    : p.rarity <= 10
    ? `診断者の約 ${p.rarity}% の稀少タイプ`
    : `診断者の約 ${p.rarity}% のタイプ`

  return (
    <div className="mt-5 space-y-3">
      {/* Keyword badge */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 bg-[#d4a853]/20 border border-[#d4a853]/40 text-[#d4a853] font-bold text-sm px-4 py-1.5 rounded-full">
          {p.keyword}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-[#93c5fd] text-xs px-3 py-1.5 rounded-full">
          👥 {rarityLabel}
        </span>
      </div>

      {/* Tagline */}
      <p className="text-white/90 text-base sm:text-lg font-medium leading-relaxed italic">
        「{p.tagline}」
      </p>

      {/* Famous people */}
      <p className="text-[#93c5fd] text-xs">
        同タイプの著名人: <span className="text-white/70">{p.famousPeople}</span>
      </p>
    </div>
  )
}
