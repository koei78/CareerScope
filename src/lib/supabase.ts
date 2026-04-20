import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper to save diagnosis result
export async function saveDiagnosisResult(
  sessionId: string,
  userId: string | null,
  answers: Record<number, string>,
  result: Record<string, unknown>,
) {
  const { error } = await supabase.from('diagnosis_results').insert({
    session_id: sessionId,
    user_id: userId,
    dimension_scores: result.dimensionScores,
    career_type_matches: result.careerTypeMatches,
    income_estimate: result.incomeEstimate,
    success_probability: result.successProbability,
    growth_speed: result.growthSpeed,
    reliability_score: result.reliabilityScore,
  })

  if (error) throw error
}
