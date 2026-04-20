'use client'

import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts'
import type { DimensionScores, Dimension } from '@/types/diagnosis'
import { DIMENSION_LABELS } from '@/types/diagnosis'

interface Props {
  scores: DimensionScores
  strengths: Dimension[]
  weaknesses: Dimension[]
}

const RADAR_DIMS: Dimension[] = ['RT', 'AT', 'LP', 'ID', 'SI', 'TA', 'AM', 'CT', 'PE', 'SP']

export function RadarChartSection({ scores, strengths, weaknesses }: Props) {
  const data = RADAR_DIMS.map(dim => ({
    subject: DIMENSION_LABELS[dim],
    score: scores[dim] ?? 0,
    fullMark: 100,
  }))

  return (
    <div className="card">
      <h3 className="font-bold text-[#0f172a] text-xl mb-6">能力プロファイル</h3>

      <div className="h-72 sm:h-80 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'Noto Sans JP, sans-serif' }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              tickCount={4}
            />
            <Radar
              name="あなたのスコア"
              dataKey="score"
              stroke="#1e3a5f"
              fill="#1e3a5f"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Tooltip
              formatter={(value: number) => [`${value}点`, '']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '13px',
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-[#f0fdf4] rounded-xl border border-green-100">
          <h4 className="text-sm font-bold text-[#059669] mb-3">強み TOP3</h4>
          <div className="space-y-2">
            {strengths.map((dim, i) => (
              <div key={dim} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#059669] font-bold">#{i + 1}</span>
                  <span className="text-sm text-[#0f172a] font-medium">{DIMENSION_LABELS[dim]}</span>
                </div>
                <span className="text-sm font-bold text-[#059669]">{scores[dim]}点</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#fff7ed] rounded-xl border border-orange-100">
          <h4 className="text-sm font-bold text-[#d97706] mb-3">伸びしろ TOP3</h4>
          <div className="space-y-2">
            {weaknesses.map((dim, i) => (
              <div key={dim} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#d97706] font-bold">#{i + 1}</span>
                  <span className="text-sm text-[#0f172a] font-medium">{DIMENSION_LABELS[dim]}</span>
                </div>
                <span className="text-sm font-bold text-[#d97706]">{scores[dim]}点</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
