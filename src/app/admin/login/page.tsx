import type { Metadata } from "next";
import Image from "next/image";
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/realisations-08.jpeg"
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover opacity-35"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/80 to-slate-950/95" />
      <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-brand-navy/45 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-[1fr_430px] lg:gap-10">
        <section className="hidden text-white lg:block">
          <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
            Espace sécurisé
          </p>
          <h1 className="mt-5 max-w-xl text-4xl font-display font-black leading-tight xl:text-5xl">
            Tableau de bord administrateur TAM&apos;S EMPIRE
          </h1>
          <p className="mt-4 max-w-xl text-base text-slate-200">
            Gérez vos produits, images et contenus business depuis un panneau unifié, rapide et
            sécurisé.
          </p>
        </section>

        <section className="w-full rounded-3xl border border-white/20 bg-white/90 p-6 shadow-[0_24px_70px_-25px_rgba(2,6,23,0.6)] backdrop-blur-md sm:p-7">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <Image
                src="/images/logo-02.jpeg"
                alt="TAM'S EMPIRE CONSTRUCTION"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
                Espace Admin
              </p>
              <h2 className="text-xl font-display font-black text-brand-navy">Connexion</h2>
            </div>
          </div>

          <p className="mb-5 text-sm text-slate-600">
            Connectez-vous pour gérer le catalogue produits et les contenus du site.
          </p>
          <LoginForm />
          <p className="mt-4 text-center text-xs text-slate-500">
            Accès réservé aux administrateurs autorisés.
          </p>
        </section>
      </div>
    </div>
  );
}
