import type { Metadata } from 'next'

export const metadata: Metadata = { title: '特定商取引法に基づく表記' }

const ITEMS = [
  { label: '販売事業者名', value: '株式会社CareerScope（仮）' },
  { label: '代表者', value: '代表取締役（氏名）' },
  { label: '所在地', value: '東京都（請求があれば開示します）' },
  { label: '電話番号', value: '請求があれば開示します' },
  { label: 'メールアドレス', value: 'legal@careerscope.jp' },
  { label: 'サービス名', value: 'CareerScope（キャリアスコープ）' },
  { label: '料金', value: 'フリー：無料 / プロ：¥1,980/月（税込）' },
  { label: '支払い方法', value: 'クレジットカード（Stripe決済）' },
  { label: '支払い時期', value: '申込時に決済' },
  { label: 'サービス提供時期', value: '決済完了直後から利用可能' },
  { label: 'キャンセル・返金', value: '月払いは当月分のキャンセル・返金不可。翌月以降の解約は随時可能。' },
  { label: '動作環境', value: 'Chrome/Safari/Firefox 最新版、iOS/Android スマートフォン対応' },
]

export default function CommercePage() {
  return (
    <div className="min-h-screen bg-[#f8f9fc] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-[#0f172a] mb-2">特定商取引法に基づく表記</h1>
        <p className="text-[#94a3b8] text-sm mb-10">最終更新日: 2025年1月1日</p>
        <div className="card">
          <table className="w-full text-sm">
            <tbody>
              {ITEMS.map(({ label, value }) => (
                <tr key={label} className="border-b border-[#e2e8f0] last:border-0">
                  <td className="py-3 pr-6 font-semibold text-[#0f172a] align-top w-48 whitespace-nowrap">{label}</td>
                  <td className="py-3 text-[#475569] leading-relaxed">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
