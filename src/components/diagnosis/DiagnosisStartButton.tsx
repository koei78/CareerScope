'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { useDiagnosisStore } from '@/store/diagnosisStore'

export default function DiagnosisStartButton() {
  const router = useRouter()
  const resetDiagnosis = useDiagnosisStore(s => s.resetDiagnosis)

  const handleStart = () => {
    resetDiagnosis()
    router.push('/diagnosis/questions')
  }

  return (
    <button
      onClick={handleStart}
      className="inline-flex items-center gap-3 px-10 py-5 bg-[#1e3a5f] text-white font-bold text-xl rounded-xl hover:bg-[#162d4a] active:scale-[0.98] transition-all duration-200 shadow-lg"
    >
      診断スタート
      <ArrowRight className="w-6 h-6" />
    </button>
  )
}
