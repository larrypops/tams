"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Eye, EyeOff, LockKeyhole, ShieldCheck, UserRound } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !data.success) {
        setError(data.error || "Connexion impossible.");
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Nom d&apos;utilisateur
        </label>
        <div className="relative">
          <UserRound
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          />
          <input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white pr-3 pl-9 text-sm outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
            autoComplete="username"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
          Mot de passe
        </label>
        <div className="relative">
          <LockKeyhole
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
          />
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white pr-10 pl-9 text-sm outline-none transition-colors focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/25"
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 transition-colors hover:text-slate-700"
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {error ? (
        <p className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-navy text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand-navy/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
            Connexion...
          </>
        ) : (
          <>
            <ShieldCheck size={16} />
            Se connecter
          </>
        )}
      </button>
    </form>
  );
}
