"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FilterX, LogOut, Pencil, Plus, Search, ShieldCheck, Trash2 } from "lucide-react";
import type { Product, ProductCategory } from "@/src/lib/content/types";

type AdminProductsListClientProps = {
  initialProducts: Product[];
  categories: ProductCategory[];
  username: string;
};

function toEditHref(id: string) {
  return `/admin/products/${encodeURIComponent(id)}/edit`;
}

export default function AdminProductsListClient({
  initialProducts,
  categories,
  username,
}: AdminProductsListClientProps) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category.id, category] as const)),
    [categories],
  );

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.shortTitle.localeCompare(b.shortTitle, "fr")),
    [products],
  );

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const category of categories) counts.set(category.id, 0);
    for (const product of products) {
      counts.set(product.categoryId, (counts.get(product.categoryId) ?? 0) + 1);
    }
    return counts;
  }, [categories, products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sortedProducts.filter((product) => {
      if (activeCategoryId !== "all" && product.categoryId !== activeCategoryId) return false;
      if (!query) return true;

      const categoryLabel = categoryMap.get(product.categoryId)?.label ?? "";
      const haystack = [product.id, product.shortTitle, product.title, product.description, categoryLabel]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [activeCategoryId, search, sortedProducts, categoryMap]);

  async function logout() {
    setLogoutLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  async function removeProduct(id: string) {
    if (!window.confirm("Supprimer ce produit ?")) return;

    setDeletingId(id);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/admin/products/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { success?: boolean; error?: string };
      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!response.ok || !data.success) {
        setError(data.error || "Impossible de supprimer le produit.");
        return;
      }

      setProducts((current) => current.filter((product) => product.id !== id));
      setSuccess("Produit supprimé.");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:py-10 lg:pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-34px_rgba(20,43,80,0.35)] sm:p-7">
        <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-brand-navy/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">Espace Admin</p>
            <h1 className="mt-1 text-2xl font-display font-black text-brand-navy md:text-3xl">
              Catalogue produits
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Connecté en tant que <span className="font-semibold text-slate-700">{username}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-gold bg-brand-gold px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-yellow-600"
            >
              <Plus size={16} />
              Créer un produit
            </Link>
            <button
              type="button"
              onClick={logout}
              disabled={logoutLoading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-navy/90 disabled:opacity-70"
            >
              <LogOut size={16} />
              {logoutLoading ? "Déconnexion..." : "Déconnexion"}
            </button>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Produits</p>
            <p className="mt-1 text-2xl font-display font-black text-brand-navy">{products.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Catégories</p>
            <p className="mt-1 text-2xl font-display font-black text-brand-navy">{categories.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Statut</p>
            <p className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-emerald-700">
              <ShieldCheck size={16} />
              Session active
            </p>
          </div>
        </div>
      </section>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </p>
      ) : null}

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-display font-bold text-brand-navy">Produits</h2>
            <p className="text-sm text-slate-500">Chaque produit a sa page de modification dédiée.</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher..."
              className="h-10 w-full rounded-xl border border-slate-300 bg-white pr-3 pl-9 text-sm outline-none transition-colors focus:border-brand-gold"
            />
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveCategoryId("all")}
            className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
              activeCategoryId === "all"
                ? "border-brand-gold bg-brand-gold text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-brand-gold/60"
            }`}
          >
            Toutes ({products.length})
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategoryId(category.id)}
              className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                activeCategoryId === category.id
                  ? "border-brand-navy bg-brand-navy text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-brand-navy/40"
              }`}
            >
              <span>{category.emoji}</span>
              <span>{category.label}</span>
              <span className="rounded-full bg-black/10 px-1.5 py-0.5 text-[10px]">
                {categoryCounts.get(category.id) ?? 0}
              </span>
            </button>
          ))}

          {(activeCategoryId !== "all" || search.trim().length > 0) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategoryId("all");
                setSearch("");
              }}
              className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-100"
            >
              <FilterX size={13} />
              Réinitialiser
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
              <p>Aucun produit trouvé avec ce filtre.</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategoryId("all");
                    setSearch("");
                  }}
                  className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Réinitialiser les filtres
                </button>
                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center gap-1 rounded-lg border border-brand-gold bg-brand-gold px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-yellow-600"
                >
                  <Plus size={13} />
                  Créer un produit
                </Link>
              </div>
            </div>
          ) : (
            filteredProducts.map((product) => {
              const category = categoryMap.get(product.categoryId);

              return (
                <article
                  key={product.id}
                  className="rounded-2xl border border-slate-200 bg-white p-3 transition-all hover:border-brand-gold/60 sm:p-4"
                >
                  <div className="flex gap-3">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={product.image}
                        alt={product.shortTitle}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-sm font-bold text-slate-800 sm:text-base">
                          {product.shortTitle}
                        </h3>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">
                          {product.availability === "coming-soon" ? "Bientôt" : "Disponible"}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-xs text-slate-500 sm:text-sm">{product.title}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-mono">{product.id}</span>
                        {category ? (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium">
                            {category.emoji} {category.label}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={toEditHref(product.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      <Pencil size={13} />
                      Modifier
                    </Link>
                    <button
                      type="button"
                      disabled={deletingId === product.id}
                      onClick={() => removeProduct(product.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 size={13} />
                      {deletingId === product.id ? "Suppression..." : "Supprimer"}
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur xl:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-700">Action rapide</p>
            <p className="text-[11px] text-slate-500">Créer un nouveau produit</p>
          </div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-yellow-600"
          >
            <Plus size={14} />
            Créer un produit
          </Link>
        </div>
      </div>
    </div>
  );
}

