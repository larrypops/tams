import type { Metadata } from "next";
import { redirect } from "next/navigation";
import LoginForm from "@/src/components/admin/LoginForm";
import { getAdminUsernameFromCookies } from "@/src/lib/admin/guards";

export const metadata: Metadata = {
  title: "Admin Login | TAM'S EMPIRE",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const username = await getAdminUsernameFromCookies();
  if (username) redirect("/admin/products");

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Espace Admin
        </p>
        <h1 className="mt-2 text-2xl font-display font-bold text-brand-navy">
          Connexion
        </h1>
        <p className="mt-1 mb-5 text-sm text-slate-500">
          Connectez-vous pour gérer le catalogue produits.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

