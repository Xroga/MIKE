import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <p style={{ color: 'var(--muted)', fontSize: 14, margin: 0 }}>Built with Xroga</p>
        <h1>Real Estate Platform</h1>
        <p>
          Live on your Vercel. Code on your GitHub. Auth, database, and storage use
          <strong> your Supabase project</strong> when connected in Xroga Integrations.
        </p>
        <div className="row">
          <Link className="button" href="/login">
            Sign in
          </Link>
          <a className="button" href="/api/health">
            Health
          </a>
        </div>
      </section>
      <section className="panel">
        <strong>Live features</strong>
        <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
          Connect Supabase (URL + anon + service role) and OpenAI/Stripe in Xroga
          Integrations — they sync into this Vercel project env and power{' '}
          <code>/api/*</code> routes. Prefer <strong>Ship setup → Authorize Supabase</strong> so
          Xroga applies schema automatically (or run{' '}
          <code>supabase/migrations/001_initial.sql</code> once).
        </p>
      </section>

    </main>
  );
}
