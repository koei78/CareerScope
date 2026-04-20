'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { ProgressBar } from '@/components/diagnosis/ProgressBar'
import { QuestionCard } from '@/components/diagnosis/QuestionCard'
import { useDiagnosisStore } from '@/store/diagnosisStore'
import { QUESTIONS, TOTAL_QUESTIONS } from '@/lib/diagnosis/questions'
import { runDiagnosis } from '@/lib/diagnosis/algorithm'
import { cn } from '@/lib/utils'

export default function QuestionsPage() {
  const router = useRouter()
  const {
    answers,
    currentQuestion,
    setAnswer,
    setCurrentQuestion,
    setResult,
    resetDiagnosis,
  } = useDiagnosisStore()

  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [isCalculating, setIsCalculating] = useState(false)

  const question = QUESTIONS.find(q => q.id === currentQuestion)!
  const selectedOption = answers[currentQuestion]
  const canGoNext = !!selectedOption

  const goNext = useCallback(async () => {
    if (!canGoNext) return

    if (currentQuestion === TOTAL_QUESTIONS) {
      // Final question - run diagnosis
      setIsCalculating(true)
      await new Promise(r => setTimeout(r, 1800)) // Simulate analysis
      const result = runDiagnosis(answers)
      setResult(result)
      setIsCalculating(false)
      router.push('/diagnosis/result')
      return
    }

    setDirection('forward')
    setCurrentQuestion(currentQuestion + 1)
  }, [canGoNext, currentQuestion, answers, router, setCurrentQuestion, setResult])

  const goBack = useCallback(() => {
    if (currentQuestion === 1) {
      resetDiagnosis()
      router.push('/diagnosis')
      return
    }
    setDirection('backward')
    setCurrentQuestion(currentQuestion - 1)
  }, [currentQuestion, router, resetDiagnosis, setCurrentQuestion])

  const handleSelect = useCallback(
    (optionId: 'A' | 'B' | 'C' | 'D') => {
      setAnswer(currentQuestion, optionId)
    },
    [currentQuestion, setAnswer],
  )

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-4">
          <div className="w-20 h-20 bg-[#1e3a5f] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-[#0f172a] mb-3">分析中...</h2>
          <p className="text-[#475569] text-sm leading-relaxed">
            10次元スコアリング・キャリアタイプマッチング・
            <br />
            年収推定モデルを実行しています
          </p>
          <div className="mt-6 space-y-2">
            {[
              '✓ 行動パターン分析完了',
              '✓ 認知能力スコア算出中...',
              '○ キャリアタイプマッチング中...',
            ].map((step, i) => (
              <div key={i} className={cn('text-sm', i < 1 ? 'text-[#059669]' : 'text-[#94a3b8]')}>
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={currentQuestion} total={TOTAL_QUESTIONS} />
        </div>

        {/* Question */}
        <div className="card mb-6 min-h-[420px]">
          <div className="text-xs font-semibold text-[#94a3b8] mb-4 tracking-wider uppercase">
            Q{currentQuestion.toString().padStart(2, '0')}
          </div>
          <QuestionCard
            question={question}
            selectedOption={selectedOption}
            onSelect={handleSelect}
            direction={direction}
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={goBack}
            className="flex items-center gap-2 px-5 py-3 text-[#475569] font-medium rounded-xl border border-[#e2e8f0] bg-white hover:bg-[#f8f9fc] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            戻る
          </button>

          <div className="text-center text-xs text-[#94a3b8]">
            {Object.keys(answers).length} / {TOTAL_QUESTIONS} 回答済み
          </div>

          <button
            onClick={goNext}
            disabled={!canGoNext}
            className={cn(
              'flex items-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-200',
              canGoNext
                ? 'bg-[#1e3a5f] text-white hover:bg-[#162d4a] shadow-sm active:scale-[0.98]'
                : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed',
            )}
          >
            {currentQuestion === TOTAL_QUESTIONS ? '診断結果を見る' : '次へ'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Hint */}
        {!selectedOption && (
          <p className="text-center text-xs text-[#94a3b8] mt-4">
            選択肢をタップして次へ進んでください
          </p>
        )}
      </div>
    </div>
  )
}
