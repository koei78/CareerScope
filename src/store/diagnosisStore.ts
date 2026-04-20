'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { DiagnosisAnswers, DiagnosisResult } from '@/types/diagnosis'

interface DiagnosisStore {
  answers: DiagnosisAnswers
  currentQuestion: number
  result: DiagnosisResult | null
  sessionId: string | null

  setAnswer: (questionId: number, optionId: 'A' | 'B' | 'C' | 'D') => void
  setCurrentQuestion: (n: number) => void
  setResult: (result: DiagnosisResult) => void
  setSessionId: (id: string) => void
  resetDiagnosis: () => void
  canGoNext: (questionId: number) => boolean
}

export const useDiagnosisStore = create<DiagnosisStore>()(
  persist(
    (set, get) => ({
      answers: {},
      currentQuestion: 1,
      result: null,
      sessionId: null,

      setAnswer: (questionId, optionId) =>
        set(state => ({
          answers: { ...state.answers, [questionId]: optionId },
        })),

      setCurrentQuestion: (n) => set({ currentQuestion: n }),

      setResult: (result) => set({ result }),

      setSessionId: (id) => set({ sessionId: id }),

      resetDiagnosis: () =>
        set({ answers: {}, currentQuestion: 1, result: null, sessionId: null }),

      canGoNext: (questionId) => {
        const { answers } = get()
        return !!answers[questionId]
      },
    }),
    {
      name: 'careerscope-diagnosis',
      partialize: (state) => ({
        answers: state.answers,
        currentQuestion: state.currentQuestion,
        result: state.result,
        sessionId: state.sessionId,
      }),
    },
  ),
)
