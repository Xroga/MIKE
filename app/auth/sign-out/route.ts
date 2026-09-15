import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const origin = new URL(request.url).origin;
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    /* ignore */
  }
  return NextResponse.redirect(new URL('/', origin), 303);
}
