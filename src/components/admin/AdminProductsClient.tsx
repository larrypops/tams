"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormState>(getEmptyForm(defaultCategoryId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.shortTitle.localeCompare(b.shortTitle, "fr")),
    [products],
  );

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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
            Espace Admin
          </p>
          <h1 className="mt-1 text-2xl font-display font-bold text-brand-navy">
            Gestion des produits
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Connecté en tant que <span className="font-semibold">{username}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={startCreate}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
          >
            Nouveau produit
          </button>
          <button
            type="button"
            onClick={logout}
            disabled={logoutLoading}
            className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-navy/90 disabled:opacity-70"
          >
            {logoutLoading ? "Déconnexion..." : "Déconnexion"}
          </button>
        </div>
      </div>

      {error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {success}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-display font-bold text-brand-navy">
            Produits ({products.length})
          </h2>
          <div className="space-y-3">
            {sortedProducts.map((product) => (
              <article
                key={product.id}
                className="rounded-xl border border-slate-200 p-4 transition-colors hover:border-brand-gold/70"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{product.id}</p>
                    <h3 className="text-base font-semibold text-slate-800">{product.shortTitle}</h3>
                    <p className="mt-1 text-sm text-slate-500">{product.title}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => startEdit(product)}
                      className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      disabled={deletingId === product.id}
                      onClick={() => removeProduct(product.id)}
                      className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:opacity-60"
                    >
                      {deletingId === product.id ? "Suppression..." : "Supprimer"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-display font-bold text-brand-navy">
            {editingId ? "Modifier le produit" : "Créer un produit"}
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Catégorie</label>
              <select
                value={form.categoryId}
                onChange={(event) =>
                  setForm((current) => ({ ...current, categoryId: event.target.value }))
                }
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
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
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
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
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Image principale</label>
              <input
                value={form.image}
                onChange={(event) =>
                  setForm((current) => ({ ...current, image: event.target.value }))
                }
                placeholder="/images/mon-produit.jpeg"
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
                required
              />
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <label className="inline-flex cursor-pointer items-center rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100">
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
                  {uploading ? "Upload..." : "Uploader une image"}
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
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({ ...current, description: event.target.value }))
                }
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
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
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
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
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
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
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition-colors focus:border-brand-gold"
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
                className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none transition-colors focus:border-brand-gold"
              >
                <option value="available">Disponible</option>
                <option value="coming-soon">Bientôt disponible</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 rounded-lg bg-brand-gold px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-yellow-600 disabled:opacity-70"
              >
                {saving ? "Enregistrement..." : editingId ? "Mettre à jour" : "Créer"}
              </button>
              {editingId ? (
                <button
                  type="button"
                  onClick={startCreate}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
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
