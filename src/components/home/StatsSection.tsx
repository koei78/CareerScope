const STATS = [
  { value: '10', unit: '次元', label: '多角的スコアリング軸' },
  { value: '30', unit: '問', label: '科学的設計の診断問題' },
  { value: '15', unit: 'タイプ', label: 'キャリアタイプ分類' },
  { value: '5', unit: '段階', label: '年収レンジ推定' },
  { value: '100+', unit: '職業', label: '詳細適性評価' },
  { value: '92', unit: '%', label: '平均信頼度スコア' },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-[#1e3a5f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {STATS.map(({ value, unit, label }) => (
            <div key={label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white">
                {value}
                <span className="text-[#d4a853] text-xl ml-0.5">{unit}</span>
              </div>
              <div className="text-[#93c5fd] text-xs mt-1 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
