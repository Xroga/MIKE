import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/** Supabase Auth callback — exchange code and persist cookies (user's project). */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  if (code) {
    try {
      const supabase = await createClient();
      await supabase.auth.exchangeCodeForSession(code);
    } catch {
      /* env may be missing until user syncs keys */
    }
  }
  return NextResponse.redirect(new URL('/', url.origin));
}
