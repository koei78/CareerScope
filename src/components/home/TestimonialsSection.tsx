import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'T.K.',
    age: 28,
    job: 'Webエンジニア → プロダクトマネージャー転職',
    rating: 5,
    comment: '「ITエンジニア型94%・コンサル型88%」という結果で、エンジニアとビジネスの橋渡し役が自分に向いていると確信。PMへの転職を決断しました。年収も予測通り120万円以上アップしました。',
  },
  {
    name: 'M.S.',
    age: 34,
    job: '大手メーカー勤務 → 副業・起業準備中',
    rating: 5,
    comment: '「起業家型91%」と出て正直驚きました。リスク耐性と達成動機が高いと言われ、自分でも気づいていなかった起業志向を認識。現在副業を開始し、独立に向けて動いています。',
  },
  {
    name: 'A.Y.',
    age: 26,
    job: '公務員 → データサイエンティスト転職準備',
    rating: 5,
    comment: '「分析思考AT: 94点・継続力PE: 88点」の結果から研究開発型・ITエンジニア型が上位に。データサイエンスへの転職を科学的に後押しされた気がしました。診断の信頼度の高さが他と違います。',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading">診断が、キャリアを変えた</h2>
          <p className="section-sub">実際に診断を活用してキャリアを変えた方の声をご紹介します</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ name, age, job, rating, comment }) => (
            <div key={name} className="card-hover">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#d4a853] text-[#d4a853]" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-[#475569] text-sm leading-relaxed mb-6">
                「{comment}」
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#e2e8f0]">
                <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#1e3a5f] font-bold text-sm">{name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-[#0f172a] text-sm">{name}（{age}歳）</div>
                  <div className="text-[#94a3b8] text-xs">{job}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
