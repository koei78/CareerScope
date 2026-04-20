'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { Question, AnswerOption } from '@/types/diagnosis'
import { cn } from '@/lib/utils'

interface Props {
  question: Question
  selectedOption: 'A' | 'B' | 'C' | 'D' | undefined
  onSelect: (optionId: 'A' | 'B' | 'C' | 'D') => void
  direction?: 'forward' | 'backward'
}

const OPTION_COLORS: Record<string, string> = {
  A: 'border-blue-200 bg-blue-50 data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-50',
  B: 'border-green-200 bg-green-50 data-[selected=true]:border-green-500 data-[selected=true]:bg-green-50',
  C: 'border-orange-200 bg-orange-50 data-[selected=true]:border-orange-500 data-[selected=true]:bg-orange-50',
  D: 'border-purple-200 bg-purple-50 data-[selected=true]:border-purple-500 data-[selected=true]:bg-purple-50',
}

const OPTION_BADGE_COLORS: Record<string, string> = {
  A: 'bg-blue-100 text-blue-700 group-data-[selected=true]:bg-blue-500 group-data-[selected=true]:text-white',
  B: 'bg-green-100 text-green-700 group-data-[selected=true]:bg-green-500 group-data-[selected=true]:text-white',
  C: 'bg-orange-100 text-orange-700 group-data-[selected=true]:bg-orange-500 group-data-[selected=true]:text-white',
  D: 'bg-purple-100 text-purple-700 group-data-[selected=true]:bg-purple-500 group-data-[selected=true]:text-white',
}

export function QuestionCard({ question, selectedOption, onSelect, direction = 'forward' }: Props) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: direction === 'forward' ? 40 : -40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction === 'forward' ? -40 : 40 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Scenario */}
        {question.scenario && (
          <div className="mb-5 p-4 bg-[#f0f4fa] border border-[#d9e4f3] rounded-xl">
            <p className="text-[#1e3a5f] text-sm font-medium leading-relaxed">
              📌 {question.scenario}
            </p>
          </div>
        )}

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0f172a] leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option: AnswerOption) => {
            const isSelected = selectedOption === option.id
            return (
              <button
                key={option.id}
                data-selected={isSelected}
                className={cn(
                  'group w-full text-left p-4 rounded-xl border-2 transition-all duration-200',
                  'hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99]',
                  isSelected
                    ? 'border-[#1e3a5f] bg-[#1e3a5f]/5 shadow-sm'
                    : 'border-[#e2e8f0] bg-white hover:border-[#1e3a5f]/40',
                )}
                onClick={() => onSelect(option.id)}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200',
                      isSelected
                        ? 'bg-[#1e3a5f] text-white'
                        : 'bg-[#f1f5f9] text-[#475569]',
                    )}
                  >
                    {option.id}
                  </span>
                  <span
                    className={cn(
                      'text-sm sm:text-base leading-relaxed pt-0.5 transition-colors',
                      isSelected ? 'text-[#0f172a] font-medium' : 'text-[#475569]',
                    )}
                  >
                    {option.text}
                  </span>
                  {isSelected && (
                    <span className="flex-shrink-0 ml-auto pt-0.5 text-[#1e3a5f]">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
