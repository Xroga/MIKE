import { NextResponse } from 'next/server';

/**
 * Example live feature powered by vault → Vercel env.
 * Save OPENAI_API_KEY (or OPENROUTER_API_KEY) in Xroga Integrations.
 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { message?: string };
  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json({ error: 'message required' }, { status: 400 });
  }

  const openAiKey = process.env.OPENAI_API_KEY;
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const apiKey = openAiKey || openRouterKey;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          'No AI key in Vercel env. Save openai or openrouter in Xroga Integrations, then redeploy.',
      },
      { status: 503 },
    );
  }

  const base = openAiKey ? 'https://api.openai.com/v1' : 'https://openrouter.ai/api/v1';
  const model = openAiKey ? 'gpt-4o-mini' : 'openai/gpt-4o-mini';

  const res = await fetch(`${base}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are a helpful product assistant.' },
        { role: 'user', content: message },
      ],
      max_tokens: 400,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err.slice(0, 300) }, { status: 502 });
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return NextResponse.json({
    reply: data.choices?.[0]?.message?.content ?? '',
  });
}
