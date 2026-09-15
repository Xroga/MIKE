import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    app: "Real Estate Platform",
    hasOpenAI: Boolean(process.env.OPENAI_API_KEY),
    hasSupabase: Boolean(
      process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
    hasSupabaseServiceRole: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    hasStripe: Boolean(process.env.STRIPE_SECRET_KEY),
  });
}
