"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-semibold text-slate-700">
          Nom d&apos;utilisateur
        </label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
          autoComplete="username"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-semibold text-slate-700">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="h-11 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
          autoComplete="current-password"
          required
        />
      </div>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-lg bg-brand-navy text-sm font-bold text-white transition-colors hover:bg-brand-navy/90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}

