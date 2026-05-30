import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Grace Solar" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { user, signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/admin" });
  }, [user, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fn = mode === "signin" ? signIn : signUp;
    const { error } = await fn(email, password);
    setBusy(false);
    if (error) setError(error);
    else if (mode === "signup") setError("Account created. You can sign in now.");
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-6 py-24">
        <h1 className="font-display text-5xl font-bold tracking-tighter">{mode === "signin" ? "Sign in" : "Create account"}</h1>
        <p className="mt-3 text-sm text-muted-foreground">Admin access for the Grace Solar shop.</p>

        <div className="mt-8 inline-flex rounded-full border border-border bg-card p-1.5">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`rounded-full px-5 py-2 text-sm font-medium ${mode === m ? "bg-ink text-background" : "text-foreground"}`}
            >
              {m === "signin" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-primary" />
          <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-primary" />
          {error && <div className="rounded-2xl bg-muted px-4 py-3 text-sm">{error}</div>}
          <button disabled={busy} className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60">
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <Link to="/" className="mt-6 inline-block text-xs text-muted-foreground hover:text-foreground">← Back to site</Link>
      </section>
    </SiteLayout>
  );
}
