"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  FilterX,
  ImagePlus,
  LayoutGrid,
  LogOut,
  Package,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import type { Product, ProductCategory } from "@/src/lib/content/types";

type AdminProductsClientProps = {
  initialProducts: Product[];
  categories: ProductCategory[];
  username: string;
};

type ProductFormState = {
  categoryId: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  gallery: string;
  features: string;
  applications: string;
  advantages: string;
  availability: "available" | "coming-soon";
};

function toMultiline(values: string[] | undefined) {
  return (values ?? []).join("\n");
}

function parseMultiline(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getEmptyForm(categoryId: string): ProductFormState {
  return {
    categoryId,
    title: "",
    shortTitle: "",
    description: "",
    image: "",
    gallery: "",
    features: "",
    applications: "",
    advantages: "",
    availability: "available",
  };
}

function fromProduct(product: Product): ProductFormState {
  return {
    categoryId: product.categoryId,
    title: product.title,
    shortTitle: product.shortTitle,
    description: product.description,
    image: product.image,
    gallery: toMultiline(product.gallery),
    features: toMultiline(product.features),
    applications: toMultiline(product.applications),
    advantages: toMultiline(product.advantages),
    availability: product.availability ?? "available",
  };
}

export default function AdminProductsClient({
  initialProducts,
  categories,
  username,
}: AdminProductsClientProps) {
  const router = useRouter();
  const defaultCategoryId = categories[0]?.id ?? "";

  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [activeCategoryId, setActiveCategoryId] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormState>(getEmptyForm(defaultCategoryId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const categoryMap = useMemo(
    () => new Map(categories.map((category) => [category.id, category] as const)),
    [categories],
  );

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.shortTitle.localeCompare(b.shortTitle, "fr")),
    [products],
  );

  const availableCount = useMemo(
    () => products.filter((product) => product.availability !== "coming-soon").length,
    [products],
  );

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const category of categories) {
      counts.set(category.id, 0);
    }
    for (const product of products) {
      counts.set(product.categoryId, (counts.get(product.categoryId) ?? 0) + 1);
    }
    return counts;
  }, [categories, products]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sortedProducts.filter((product) => {
      if (activeCategoryId !== "all" && product.categoryId !== activeCategoryId) {
        return false;
      }

      if (!query) {
        return true;
      }

      const categoryLabel = categoryMap.get(product.categoryId)?.label ?? "";
      const haystack = [
        product.id,
        product.shortTitle,
        product.title,
        product.description,
        categoryLabel,
      ]
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

  function startCreate() {
    setEditingId(null);
    setForm(getEmptyForm(defaultCategoryId));
    setError(null);
    setSuccess(null);
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm(fromProduct(product));
    setError(null);
    setSuccess(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!categories.length) {
      setError("Aucune catégorie disponible.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    const payload = {
      categoryId: form.categoryId,
      title: form.title,
      shortTitle: form.shortTitle,
      description: form.description,
      image: form.image,
      gallery: parseMultiline(form.gallery),
      features: parseMultiline(form.features),
      applications: parseMultiline(form.applications),
      advantages: parseMultiline(form.advantages),
      availability: form.availability,
    };

    try {
      const response = await fetch(
        editingId ? `/api/admin/products/${editingId}` : "/api/admin/products",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product: payload }),
        },
      );
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        product?: Product;
      };

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!response.ok || !data.success || !data.product) {
        setError(data.error || "Impossible d'enregistrer le produit.");
        return;
      }

      if (editingId) {
        setProducts((current) =>
          current.map((product) => (product.id === editingId ? data.product! : product)),
        );
        setSuccess("Produit mis à jour avec succès.");
      } else {
        setProducts((current) => [data.product!, ...current]);
        setSuccess("Produit créé avec succès.");
      }

      setEditingId(null);
      setForm(getEmptyForm(defaultCategoryId));
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSaving(false);
    }
  }

  async function uploadMainImage(file: File) {
    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "tams/products");

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      const data = (await response.json()) as {
        success?: boolean;
        error?: string;
        media?: { url?: string };
      };

      if (response.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!response.ok || !data.success || !data.media?.url) {
        setError(data.error || "Upload impossible.");
        return;
      }

      const uploadedUrl = data.media.url;
      setForm((current) => {
        const galleryLines = parseMultiline(current.gallery);
        if (!galleryLines.includes(uploadedUrl)) {
          galleryLines.push(uploadedUrl);
        }
        return {
          ...current,
          image: uploadedUrl,
          gallery: galleryLines.join("\n"),
        };
      });
      setSuccess("Image téléversée avec succès.");
    } catch {
      setError("Erreur réseau pendant l'upload.");
    } finally {
      setUploading(false);
    }
  }

  async function removeProduct(id: string) {
    if (!window.confirm("Supprimer ce produit ?")) return;

    setDeletingId(id);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
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
      if (editingId === id) startCreate();
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-34px_rgba(20,43,80,0.35)] sm:p-7">
        <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-brand-navy/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">
              Espace Admin
            </p>
            <h1 className="mt-1 text-2xl font-display font-black text-brand-navy md:text-3xl">
              Gestion des produits
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Connecté en tant que <span className="font-semibold text-slate-700">{username}</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={startCreate}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand-gold/70 hover:shadow-md"
            >
              <Plus size={16} />
              Nouveau
            </button>
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
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3 sm:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Disponibles immédiatement
            </p>
            <p className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-brand-navy">
              <CheckCircle2 size={16} className="text-emerald-600" />
              {availableCount} / {products.length} produits
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

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.18fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="inline-flex items-center gap-2 text-lg font-display font-bold text-brand-navy">
                <LayoutGrid size={18} />
                Catalogue
              </h2>
              <p className="text-sm text-slate-500">Clique sur un produit pour le modifier.</p>
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
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategoryId("all");
                    setSearch("");
                  }}
                  className="mt-3 inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              filteredProducts.map((product) => {
                const category = categoryMap.get(product.categoryId);
                const isEditing = editingId === product.id;

                return (
                  <article
                    key={product.id}
                    className={`rounded-2xl border p-3 transition-all sm:p-4 ${
                      isEditing
                        ? "border-brand-gold bg-yellow-50/40 shadow-sm"
                        : "border-slate-200 bg-white hover:border-brand-gold/60"
                    }`}
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
                            {product.availability === "coming-soon"
                              ? "Bientôt"
                              : "Disponible"}
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
                      <button
                        type="button"
                        onClick={() => startEdit(product)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        <Pencil size={13} />
                        Modifier
                      </button>
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

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:sticky xl:top-6 xl:max-h-[calc(100vh-3rem)] xl:overflow-y-auto">
          <h2 className="text-lg font-display font-bold text-brand-navy">
            {editingId ? "Modifier le produit" : "Créer un produit"}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Complète les champs puis enregistre les changements.
          </p>

          <form onSubmit={onSubmit} className="mt-5 space-y-5">
            <fieldset className="space-y-4">
              <legend className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Identité
              </legend>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Catégorie</label>
                <select
                  value={form.categoryId}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, categoryId: event.target.value }))
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.emoji} {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Titre</label>
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Titre court</label>
                <input
                  value={form.shortTitle}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, shortTitle: event.target.value }))
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Disponibilité</label>
                <select
                  value={form.availability}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      availability: event.target.value as "available" | "coming-soon",
                    }))
                  }
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
                >
                  <option value="available">Disponible</option>
                  <option value="coming-soon">Bientôt disponible</option>
                </select>
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Médias
              </legend>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Image principale</label>
                <input
                  value={form.image}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, image: event.target.value }))
                  }
                  placeholder="/images/mon-produit.jpeg"
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
                  required
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <label className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      className="hidden"
                      disabled={uploading}
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        await uploadMainImage(file);
                        event.target.value = "";
                      }}
                    />
                    <ImagePlus size={13} />
                    {uploading ? "Upload..." : "Uploader"}
                  </label>
                  {form.image ? (
                    <a
                      href={form.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-brand-navy underline-offset-2 hover:underline"
                    >
                      Prévisualiser
                    </a>
                  ) : null}
                </div>

                {form.image ? (
                  <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img
                      src={form.image}
                      alt="Aperçu"
                      className="h-40 w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <div className="mt-3 flex h-28 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-500">
                    Aperçu image
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Galerie (1 image par ligne)
                </label>
                <textarea
                  value={form.gallery}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, gallery: event.target.value }))
                  }
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
                />
              </div>
            </fieldset>

            <fieldset className="space-y-4">
              <legend className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Contenu
              </legend>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, description: event.target.value }))
                  }
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Caractéristiques (1 ligne = 1 point)
                </label>
                <textarea
                  value={form.features}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, features: event.target.value }))
                  }
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Applications (1 ligne = 1 point)
                </label>
                <textarea
                  value={form.applications}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, applications: event.target.value }))
                  }
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Avantages (1 ligne = 1 point)
                </label>
                <textarea
                  value={form.advantages}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, advantages: event.target.value }))
                  }
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
                  required
                />
              </div>
            </fieldset>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gold px-4 py-3 text-sm font-bold text-white transition-all hover:bg-yellow-600 disabled:opacity-70"
              >
                <Package size={16} />
                {saving ? "Enregistrement..." : editingId ? "Mettre à jour" : "Créer le produit"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={startCreate}
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                >
                  Annuler
                </button>
              ) : null}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
