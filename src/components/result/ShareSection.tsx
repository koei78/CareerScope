'use client'

import { useState } from 'react'
import { Share2, Link, Check, BookmarkPlus } from 'lucide-react'
import type { DiagnosisResult } from '@/types/diagnosis'
import { CAREER_TYPE_LABELS, CAREER_TYPE_ICONS } from '@/types/diagnosis'
import { formatIncome } from '@/lib/utils'

interface Props {
  result: DiagnosisResult
}

export function ShareSection({ result }: Props) {
  const [copied, setCopied] = useState(false)

  const topType = result.topCareerType
  const income = result.incomeEstimate.currentMedian

  const shareText = `CareerScopeで診断してみました！\n\n🎯 最適キャリアタイプ: ${CAREER_TYPE_ICONS[topType]}${CAREER_TYPE_LABELS[topType]}\n💰 推定年収中央値: ${formatIncome(income)}\n🚀 成功確率: ${result.successProbability}%\n\nあなたも診断してみて👇`

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + '/diagnosis' : ''

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="card bg-gradient-to-br from-[#1e3a5f] to-[#162d4a] text-white">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-[#d4a853]" />
        <h3 className="font-bold text-lg">結果をシェアする</h3>
      </div>

      {/* Result summary card for sharing */}
      <div className="bg-white/10 backdrop-blur rounded-xl p-4 mb-6 border border-white/20">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{CAREER_TYPE_ICONS[topType]}</span>
          <div>
            <div className="text-xs text-[#93c5fd]">最適キャリアタイプ</div>
            <div className="font-bold text-white">{CAREER_TYPE_LABELS[topType]}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs text-[#93c5fd]">マッチ度</div>
            <div className="font-bold text-[#d4a853] text-xl">
              {result.careerTypeMatches[0].matchScore}%
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-sm">
          <div>
            <span className="text-[#93c5fd]">年収中央値: </span>
            <span className="font-bold text-white">{formatIncome(income)}</span>
          </div>
          <div>
            <span className="text-[#93c5fd]">成功確率: </span>
            <span className="font-bold text-white">{result.successProbability}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 bg-[#1d9bf0] hover:bg-[#1a8cd8] rounded-xl font-semibold text-sm transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.952-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Xでシェア
        </a>

        <button
          onClick={copyLink}
          className="flex items-center justify-center gap-2 py-3 px-4 bg-white/15 hover:bg-white/20 rounded-xl font-semibold text-sm transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Link className="w-4 h-4" />}
          {copied ? 'コピー済み！' : 'リンクをコピー'}
        </button>
      </div>

      {/* Save CTA */}
      <div className="mt-6 pt-5 border-t border-white/20">
        <div className="text-center">
          <p className="text-[#93c5fd] text-sm mb-3">
            結果を保存し、詳細分析・履歴管理をするには
          </p>
          <button className="inline-flex items-center gap-2 py-3 px-8 bg-[#d4a853] text-[#0f172a] font-bold rounded-xl hover:bg-[#c49840] transition-colors text-sm">
            <BookmarkPlus className="w-4 h-4" />
            無料会員登録で結果を保存する
          </button>
          <p className="text-[#93c5fd]/60 text-xs mt-2">30秒で登録完了</p>
        </div>
      </div>
    </div>
  )
}
