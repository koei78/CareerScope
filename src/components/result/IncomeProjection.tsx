'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Area, AreaChart,
} from 'recharts'
import type { IncomeEstimate, GrowthSpeed } from '@/types/diagnosis'
import { GROWTH_SPEED_LABELS } from '@/types/diagnosis'
import { formatIncome } from '@/lib/utils'

interface Props {
  incomeEstimate: IncomeEstimate
  growthSpeed: GrowthSpeed
}

const GROWTH_SPEED_CONFIG = {
  slow:   { label: 'スタンダード成長', color: '#94a3b8', bg: 'bg-slate-100', text: 'text-slate-600' },
  medium: { label: '着実成長',         color: '#059669', bg: 'bg-green-50',   text: 'text-green-700' },
  fast:   { label: '急速成長',         color: '#d4a853', bg: 'bg-yellow-50',  text: 'text-yellow-700' },
}

export function IncomeProjection({ incomeEstimate, growthSpeed }: Props) {
  const { currentMedian, year5, year10, annualGrowthRate } = incomeEstimate

  // Generate yearly data points
  const dataPoints = Array.from({ length: 11 }, (_, i) => {
    const income = Math.round(currentMedian * Math.pow(1 + annualGrowthRate, i))
    return { year: i === 0 ? '現在' : `${i}年後`, income, y: i }
  })

  const speedConfig = GROWTH_SPEED_CONFIG[growthSpeed]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-[#0f172a] text-xl">年収推移予測</h3>
        <span className={`badge ${speedConfig.bg} ${speedConfig.text} text-xs font-semibold`}>
          {speedConfig.label}（{Math.round(annualGrowthRate * 100)}%/年）
        </span>
      </div>

      {/* Big numbers */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: '現在', value: currentMedian, highlight: false },
          { label: '5年後', value: year5, highlight: false },
          { label: '10年後', value: year10, highlight: true },
        ].map(({ label, value, highlight }) => (
          <div
            key={label}
            className={`text-center p-3 rounded-xl ${
              highlight ? 'bg-[#1e3a5f] text-white' : 'bg-[#f8f9fc]'
            }`}
          >
            <div className={`text-xs font-medium mb-1 ${highlight ? 'text-[#93c5fd]' : 'text-[#94a3b8]'}`}>
              {label}
            </div>
            <div className={`text-xl font-bold ${highlight ? 'text-white' : 'text-[#0f172a]'}`}>
              {formatIncome(value)}
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataPoints}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}万`}
            />
            <Tooltip
              formatter={(value: number) => [`${value}万円`, '推定年収']}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '13px',
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#1e3a5f"
              strokeWidth={2.5}
              fill="url(#incomeGradient)"
              dot={{ fill: '#1e3a5f', r: 3 }}
              activeDot={{ r: 5, fill: '#d4a853' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <p className="text-[#94a3b8] text-xs mt-3 text-center">
        ※ 統計的傾向に基づく推定値です。実際の年収は個人の努力・環境・市場により異なります。
      </p>
    </div>
  )
}
