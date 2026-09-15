export default function LoginPage() {
  return (
    <main>
      <section className="hero">
        <h1>Sign in</h1>
        <p>
          Magic link auth against <strong>your</strong> Supabase Auth
          (<code>NEXT_PUBLIC_SUPABASE_URL</code> from Xroga vault → Vercel).
        </p>
      </section>
      <form className="panel" action="/auth/sign-in" method="post">
        <label style={{ display: 'grid', gap: '0.4rem' }}>
          Email
          <input name="email" type="email" required placeholder="you@company.com" />
        </label>
        <div className="row">
          <button type="submit">Continue with magic link</button>
        </div>
      </form>
    </main>
  );
}
