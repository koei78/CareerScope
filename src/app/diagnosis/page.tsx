import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, Shield, BarChart3, Brain, TrendingUp } from 'lucide-react'
import DiagnosisStartButton from '@/components/diagnosis/DiagnosisStartButton'

export const metadata: Metadata = {
  title: '診断スタート',
  description: '35問・約15分で職業適性・推定年収・キャリア成長速度を科学的に診断します。',
}

const ANALYSIS_ITEMS = [
  { icon: Brain, label: '行動経済学的意思決定パターン', desc: 'リスク耐性・損失回避・時間割引率を測定' },
  { icon: BarChart3, label: '認知能力（論理・分析・構造化）', desc: '論理推論・パターン認識・数的推論を評価' },
  { icon: Shield, label: '性格特性 Big5', desc: '開放性・誠実性・外向性・協調性・情緒安定性' },
  { icon: TrendingUp, label: '行動履歴・キャリア志向', desc: '学習量・挑戦頻度・継続力・キャリア価値観' },
]

export default function DiagnosisStartPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#1e3a5f]/5 rounded-full px-4 py-1.5 mb-6">
            <Clock className="w-4 h-4 text-[#1e3a5f]" />
            <span className="text-[#1e3a5f] text-sm font-semibold">所要時間：約15分 / 全35問</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0f172a] leading-tight mb-4">
            キャリア適性診断を
            <br />
            スタートしましょう
          </h1>
          <p className="text-[#475569] text-lg leading-relaxed">
            正直に、直感的に答えてください。
            <br />
            正解はありません。あなたの本音が最も精度の高い診断を導きます。
          </p>
        </div>

        {/* Analysis items */}
        <div className="card mb-8">
          <h2 className="font-bold text-[#0f172a] text-lg mb-5">この診断で分析すること</h2>
          <div className="space-y-4">
            {ANALYSIS_ITEMS.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1e3a5f]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#1e3a5f]" />
                </div>
                <div>
                  <div className="font-semibold text-[#0f172a] text-sm">{label}</div>
                  <div className="text-[#94a3b8] text-xs mt-0.5">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Output preview */}
        <div className="card mb-8 border-[#d4a853]/30 bg-gradient-to-br from-[#fffbf0] to-white">
          <h2 className="font-bold text-[#0f172a] text-lg mb-5">診断後にわかること</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              '職業タイプTOP3',
              'おすすめ職業TOP10',
              '推定年収・5年後・10年後予測',
              '成功確率スコア',
              'キャリア成長速度',
              '強み・弱みランキング',
              '優先スキル5選',
              '向いていない職業',
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-[#475569]">
                <span className="text-[#d4a853] font-bold">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy note */}
        <div className="flex items-start gap-3 text-sm text-[#94a3b8] mb-8 p-4 bg-white rounded-xl border border-[#e2e8f0]">
          <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#94a3b8]" />
          <p>
            個人を特定できる情報の入力は不要です。回答データは診断精度の向上にのみ使用し、
            個人情報として収集・保存はしません。詳細は
            <Link href="/legal/privacy" className="underline text-[#1e3a5f] hover:text-[#162d4a]">
              プライバシーポリシー
            </Link>
            をご確認ください。
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <DiagnosisStartButton />
          <p className="text-[#94a3b8] text-sm mt-3">登録なし・無料・ブラウザに保存されません</p>
        </div>
      </div>
    </div>
  )
}
