import { createHmac, timingSafeEqual } from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  const raw = await request.text();
  const signature = request.headers.get('x-signature') || '';

  if (secret) {
    const digest = createHmac('sha256', secret).update(raw).digest('hex');
    const a = Buffer.from(digest, 'utf8');
    const b = Buffer.from(signature, 'utf8');
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  }

  const event = JSON.parse(raw) as {
    meta?: { event_name?: string; custom_data?: Record<string, unknown> };
  };
  // Upgrade the signed-in user in YOUR Supabase (profiles.plan) using meta.custom_data.user_id
  console.log('[lemon-webhook]', event.meta?.event_name, event.meta?.custom_data);
  return NextResponse.json({ received: true });
}
