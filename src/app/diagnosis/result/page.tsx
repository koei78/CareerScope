'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, Shield } from 'lucide-react'
import { useDiagnosisStore } from '@/store/diagnosisStore'
import { CareerTypeCard } from '@/components/result/CareerTypeCard'
import { RadarChartSection } from '@/components/result/RadarChartSection'
import { IncomeProjection } from '@/components/result/IncomeProjection'
import { CareerRankingSection } from '@/components/result/CareerRankingSection'
import { SkillsSection } from '@/components/result/SkillsSection'
import { ShareSection } from '@/components/result/ShareSection'
import {
  CAREER_TYPE_LABELS, CAREER_TYPE_ICONS, INCOME_RANGE_LABELS,
  GROWTH_SPEED_LABELS,
} from '@/types/diagnosis'

export default function ResultPage() {
  const router = useRouter()
  const { result, resetDiagnosis } = useDiagnosisStore()

  useEffect(() => {
    if (!result) {
      router.replace('/diagnosis')
    }
  }, [result, router])

  if (!result) return null

  const {
    dimensionScores, careerTypeMatches, topCareerType,
    incomeEstimate, successProbability, growthSpeed,
    reliabilityScore, strengths, weaknesses, prioritySkills,
  } = result

  const top3Matches = careerTypeMatches.slice(0, 3)

  const handleRetry = () => {
    resetDiagnosis()
    router.push('/diagnosis')
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] pb-16">
      {/* Result Header */}
      <div className="bg-[#1e3a5f] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-[#93c5fd] text-sm mb-6">
            <Link href="/" className="hover:text-white transition-colors">ホーム</Link>
            <span>/</span>
            <span>診断結果</span>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-[#93c5fd] text-sm mb-2">診断完了 — あなたの最適キャリアタイプ</div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                {CAREER_TYPE_ICONS[topCareerType]}{' '}
                {CAREER_TYPE_LABELS[topCareerType]}
              </h1>
              <div className="flex flex-wrap gap-3">
                <span className="badge bg-[#d4a853]/20 text-[#d4a853] text-sm border border-[#d4a853]/30">
                  推定年収中央値: {incomeEstimate.currentMedian}万円
                </span>
                <span className="badge bg-white/10 text-white text-sm border border-white/20">
                  年収レンジ: {INCOME_RANGE_LABELS[incomeEstimate.range]}
                </span>
                <span className="badge bg-white/10 text-white text-sm border border-white/20">
                  成長速度: {GROWTH_SPEED_LABELS[growthSpeed]}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center bg-white/10 border border-white/20 rounded-xl px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-1 text-[#93c5fd] text-xs mb-1">
                <Shield className="w-3 h-3" />
                信頼度スコア
              </div>
              <div className="text-3xl font-bold text-white">{reliabilityScore}</div>
              <div className="text-[#93c5fd] text-xs">/ 100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-6">
        {/* Career Type TOP3 */}
        <section>
          <h2 className="text-lg font-bold text-[#0f172a] mb-4">
            🎯 あなたのキャリアタイプ TOP3
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {top3Matches.map((match, i) => (
              <CareerTypeCard key={match.id} match={match} rank={i + 1} />
            ))}
          </div>
        </section>

        {/* Radar Chart */}
        <section>
          <RadarChartSection
            scores={dimensionScores}
            strengths={strengths}
            weaknesses={weaknesses}
          />
        </section>

        {/* Income Projection */}
        <section>
          <IncomeProjection
            incomeEstimate={incomeEstimate}
            growthSpeed={growthSpeed}
          />
        </section>

        {/* Skills & Success */}
        <section>
          <SkillsSection
            skills={prioritySkills}
            successProbability={successProbability}
          />
        </section>

        {/* Career Ranking */}
        <section>
          <CareerRankingSection scores={dimensionScores} />
        </section>

        {/* Share */}
        <section>
          <ShareSection result={result} />
        </section>

        {/* Retry / Upgrade */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 card">
          <div>
            <h3 className="font-bold text-[#0f172a] mb-1">さらに精度を上げるには</h3>
            <p className="text-[#475569] text-sm">
              追加10問の詳細診断で信頼度を95%以上に向上させられます。
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-4 py-2 border border-[#e2e8f0] rounded-xl text-[#475569] text-sm hover:bg-[#f8f9fc] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              再診断
            </button>
            <Link
              href="/pricing"
              className="btn-primary text-sm py-2 px-5"
            >
              詳細診断を受ける →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
