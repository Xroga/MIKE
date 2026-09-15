import { NextResponse } from 'next/server';

/** Create a Lemon Squeezy checkout for YOUR store (keys from Vercel env via Xroga vault). */
export async function POST(request: Request) {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  const storeId = process.env.LEMONSQUEEZY_STORE_ID;
  const variantId = process.env.LEMONSQUEEZY_VARIANT_ID;
  if (!apiKey || !storeId || !variantId) {
    return NextResponse.json(
      { error: 'Lemon Squeezy not configured — save keys in Xroga Integrations' },
      { status: 503 },
    );
  }

  let email: string | undefined;
  let userId: string | undefined;
  try {
    const body = (await request.json()) as { email?: string; userId?: string };
    email = body.email;
    userId = body.userId;
  } catch {
    /* optional body */
  }

  const checkoutData: Record<string, unknown> = {
    custom: { user_id: userId || 'anonymous', app: 'real-estate-platform' },
  };
  if (email) checkoutData.email = email;

  const res = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      data: {
        type: 'checkouts',
        attributes: { checkout_data: checkoutData },
        relationships: {
          store: { data: { type: 'stores', id: String(storeId) } },
          variant: { data: { type: 'variants', id: String(variantId) } },
        },
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: text.slice(0, 200) }, { status: 502 });
  }

  const data = (await res.json()) as { data?: { attributes?: { url?: string } } };
  return NextResponse.json({ checkoutUrl: data.data?.attributes?.url });
}
