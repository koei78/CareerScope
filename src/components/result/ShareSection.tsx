'use client'

import { useRef, useState, useEffect } from 'react'
import { toPng } from 'html-to-image'
import { Share2, Download, BookmarkPlus, Loader2, CheckCircle2 } from 'lucide-react'
import type { DiagnosisResult } from '@/types/diagnosis'
import { CAREER_TYPE_LABELS, CAREER_TYPE_ICONS } from '@/types/diagnosis'
import { formatIncome } from '@/lib/utils'
import { ResultShareCard } from './ResultShareCard'

interface Props {
  result: DiagnosisResult
}

const LINE_ICON = (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
)

export function ShareSection({ result }: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [captured, setCaptured] = useState<{ dataUrl: string } | null>(null)
  const [capturing, setCapturing] = useState(false)
  const [saved, setSaved] = useState(false)

  const topType = result.topCareerType
  const income = result.incomeEstimate.currentMedian
  const shareText = `CareerScopeで診断してみました！\n\n🎯 ${CAREER_TYPE_ICONS[topType]}${CAREER_TYPE_LABELS[topType]}\n💰 推定年収: ${formatIncome(income)}\n🚀 成功確率: ${result.successProbability}%\n\nあなたも診断してみて👇`
  const shareUrl = typeof window !== 'undefined' ? window.location.origin + '/diagnosis' : ''

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!cardRef.current) return
      setCapturing(true)
      try {
        const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true })
        setCaptured({ dataUrl })
      } catch {
        // capture failed — download button will be hidden
      } finally {
        setCapturing(false)
      }
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveImage = () => {
    if (!captured) return
    const a = document.createElement('a')
    a.href = captured.dataUrl
    a.download = 'careerscope-result.png'
    a.click()
    setSaved(true)
  }

  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText + '\n' + shareUrl)}`
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`

  return (
    <div className="card bg-gradient-to-br from-[#1e3a5f] to-[#162d4a] text-white">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-[#d4a853]" />
        <h3 className="font-bold text-lg">結果をシェアする</h3>
      </div>

      {/* Preview */}
      <div className="flex justify-center mb-5">
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ width: 180, height: 320 }}>
          <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: 360, height: 640 }}>
            <ResultShareCard ref={cardRef} result={result} />
          </div>
        </div>
      </div>

      {/* Step 1: Save image */}
      <div className="mb-4">
        <div className="text-[#93c5fd] text-xs font-semibold mb-2 tracking-wide">
          STEP 1 — 画像を保存する
        </div>
        <button
          onClick={handleSaveImage}
          disabled={capturing || !captured}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-[#d4a853] hover:bg-[#c49840] disabled:opacity-50 rounded-xl font-bold text-sm text-[#0f172a] transition-colors"
        >
          {capturing
            ? <><Loader2 className="w-4 h-4 animate-spin" />画像を生成中...</>
            : saved
            ? <><CheckCircle2 className="w-4 h-4" />保存しました！</>
            : <><Download className="w-4 h-4" />画像を保存する</>
          }
        </button>
      </div>

      {/* Step 2: Open app and share */}
      <div className={`transition-all duration-300 ${saved ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
        <div className="text-[#93c5fd] text-xs font-semibold mb-2 tracking-wide">
          STEP 2 — アプリを開いて送信する
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          {/* LINE */}
          <a
            href="https://line.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 bg-[#06c755] hover:bg-[#05b34c] rounded-xl font-semibold text-sm transition-colors"
          >
            {LINE_ICON}
            LINEを開く
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-colors"
            style={{ background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Instagramを開く
          </a>
        </div>

        {saved && (
          <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-[#93c5fd] leading-relaxed">
            <span className="font-semibold text-white">LINE:</span> トークルームを開いて「＋」→ アルバムから保存した画像を選択して送信
            <br />
            <span className="font-semibold text-white">Instagram:</span> 「＋」→ 投稿またはストーリーズから保存した画像を選択
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-white/15" />
        <span className="text-[#93c5fd]/50 text-xs">テキストでシェア</span>
        <div className="flex-1 h-px bg-white/15" />
      </div>

      {/* Text share */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#06c755]/80 hover:bg-[#06c755] rounded-xl font-semibold text-sm transition-colors"
        >
          {LINE_ICON}
          LINEに送る
        </a>
        <a
          href={tweetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-4 bg-[#1d9bf0] hover:bg-[#1a8cd8] rounded-xl font-semibold text-sm transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.213 5.567 5.952-5.567zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Xでシェア
        </a>
      </div>

      {/* Save CTA */}
      <div className="mt-6 pt-5 border-t border-white/20 text-center">
        <p className="text-[#93c5fd] text-sm mb-3">結果を保存し、詳細分析・履歴管理をするには</p>
        <button className="inline-flex items-center gap-2 py-3 px-8 bg-[#d4a853] text-[#0f172a] font-bold rounded-xl hover:bg-[#c49840] transition-colors text-sm">
          <BookmarkPlus className="w-4 h-4" />
          無料会員登録で結果を保存する
        </button>
        <p className="text-[#93c5fd]/60 text-xs mt-2">30秒で登録完了</p>
      </div>
    </div>
  )
}
