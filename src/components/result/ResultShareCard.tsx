import { forwardRef } from 'react'
import type { DiagnosisResult } from '@/types/diagnosis'
import { CAREER_TYPE_LABELS, CAREER_TYPE_ICONS, DIMENSION_LABELS } from '@/types/diagnosis'
import { formatIncome } from '@/lib/utils'

interface Props {
  result: DiagnosisResult
}

// Fixed-size card rendered off-screen for image capture (360×640)
export const ResultShareCard = forwardRef<HTMLDivElement, Props>(({ result }, ref) => {
  const topType = result.topCareerType
  const top3 = result.careerTypeMatches.slice(0, 3)
  const income = result.incomeEstimate.currentMedian
  const strengths = result.strengths.slice(0, 3)

  return (
    <div
      ref={ref}
      style={{
        width: 360,
        height: 640,
        background: 'linear-gradient(160deg, #1e3a5f 0%, #162d4a 60%, #0f1f32 100%)',
        fontFamily: '"Hiragino Sans", "Noto Sans JP", "Meiryo", sans-serif',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 28px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle */}
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 200, height: 200, borderRadius: '50%',
        background: 'rgba(212,168,83,0.12)',
      }} />
      <div style={{
        position: 'absolute', bottom: -40, left: -40,
        width: 150, height: 150, borderRadius: '50%',
        background: 'rgba(147,197,253,0.08)',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: '#93c5fd', letterSpacing: '0.08em', marginBottom: 2 }}>
            CAREER SCOPE
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>キャリア適性診断 結果</div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 8,
          padding: '4px 10px',
          fontSize: 11,
          color: '#93c5fd',
        }}>
          信頼度 {result.reliabilityScore}/100
        </div>
      </div>

      {/* Career type */}
      <div style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: '20px 20px',
        marginBottom: 16,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 52, marginBottom: 8, lineHeight: 1 }}>
          {CAREER_TYPE_ICONS[topType]}
        </div>
        <div style={{ fontSize: 11, color: '#93c5fd', marginBottom: 4 }}>最適キャリアタイプ</div>
        <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
          {CAREER_TYPE_LABELS[topType]}
        </div>
        <div style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #d4a853, #e8c47a)',
          borderRadius: 20,
          padding: '4px 16px',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#0f172a',
        }}>
          マッチ度 {top3[0].matchScore}%
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        {[
          { label: '推定年収中央値', value: formatIncome(income) },
          { label: '成功確率', value: `${result.successProbability}%` },
        ].map(({ label, value }) => (
          <div key={label} style={{
            flex: 1,
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 12,
            padding: '10px 12px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 10, color: '#93c5fd', marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 16, fontWeight: 'bold' }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Top 3 */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: '#93c5fd', marginBottom: 8 }}>キャリアタイプ TOP3</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {top3.map((m, i) => (
            <div key={m.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '7px 12px',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: i === 0 ? '#d4a853' : 'rgba(255,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 'bold',
                color: i === 0 ? '#0f172a' : '#fff', flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: 12, flex: 1 }}>
                {CAREER_TYPE_ICONS[m.id]} {CAREER_TYPE_LABELS[m.id]}
              </span>
              <span style={{ fontSize: 12, fontWeight: 'bold', color: '#d4a853' }}>
                {m.matchScore}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div style={{ marginBottom: 'auto' }}>
        <div style={{ fontSize: 11, color: '#93c5fd', marginBottom: 8 }}>強み</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {strengths.map(s => (
            <span key={s} style={{
              background: 'rgba(212,168,83,0.15)',
              border: '1px solid rgba(212,168,83,0.3)',
              borderRadius: 20, padding: '3px 10px',
              fontSize: 11, color: '#d4a853',
            }}>
              {DIMENSION_LABELS[s]}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.15)',
        paddingTop: 12, marginTop: 16,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>
          あなたも診断してみよう
        </div>
        <div style={{
          fontSize: 11, fontWeight: 'bold',
          color: '#93c5fd', letterSpacing: '0.05em',
        }}>
          careerscope.app
        </div>
      </div>
    </div>
  )
})

ResultShareCard.displayName = 'ResultShareCard'
