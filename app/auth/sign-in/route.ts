import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') || '').trim();
  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }

  try {
    const supabase = await createClient();
    const origin = new URL(request.url).origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${origin}/auth/callback` },
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.redirect(new URL('/login?sent=1', origin), 303);
  } catch (err) {
    return NextResponse.json(
      {
        error:
          (err as Error).message ||
          'Supabase not configured — connect project URL + anon key in Xroga Integrations',
      },
      { status: 503 },
    );
  }
}
