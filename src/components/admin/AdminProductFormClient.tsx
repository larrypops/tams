"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, CircleAlert, ImagePlus, Package, Save } from "lucide-react";
import type { Product, ProductCategory } from "@/src/lib/content/types";

type AdminProductFormClientProps = {
  mode: "create" | "edit";
  username: string;
  categories: ProductCategory[];
  initialProduct?: Product | null;
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

function toEditHref(id: string) {
  return `/admin/products/${encodeURIComponent(id)}/edit`;
}

export default function AdminProductFormClient({
  mode,
  username,
  categories,
  initialProduct,
}: AdminProductFormClientProps) {
  const router = useRouter();
  const defaultCategoryId = categories[0]?.id ?? "";

  const initialForm = useMemo(() => {
    if (mode === "edit" && initialProduct) return fromProduct(initialProduct);
    return getEmptyForm(defaultCategoryId);
  }, [defaultCategoryId, initialProduct, mode]);

  const [form, setForm] = useState<ProductFormState>(initialForm);
  const [baseline, setBaseline] = useState<ProductFormState>(initialForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isDirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(baseline),
    [baseline, form],
  );

  useEffect(() => {
    setForm(initialForm);
    setBaseline(initialForm);
  }, [initialForm]);

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty || saving) return;
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [isDirty, saving]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== "s") return;
      event.preventDefault();
      const formElement = document.getElementById("admin-product-form") as HTMLFormElement | null;
      formElement?.requestSubmit();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

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

    const endpoint =
      mode === "edit" && initialProduct
        ? `/api/admin/products/${encodeURIComponent(initialProduct.id)}`
        : "/api/admin/products";
    const method = mode === "edit" ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: payload }),
      });

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

      if (mode === "create") {
        router.push(`${toEditHref(data.product.id)}?created=1`);
        router.refresh();
        return;
      }

      const next = fromProduct(data.product);
      setForm(next);
      setBaseline(next);
      setSuccess("Produit mis à jour avec succès.");
      router.refresh();
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 pb-24 sm:px-6 lg:px-8 lg:py-10 lg:pb-10">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_60px_-34px_rgba(20,43,80,0.35)] sm:p-7">
        <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-brand-navy/10 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-gold">Espace Admin</p>
            <h1 className="mt-1 text-2xl font-display font-black text-brand-navy md:text-3xl">
              {mode === "edit" ? "Modifier un produit" : "Créer un produit"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Connecté en tant que <span className="font-semibold text-slate-700">{username}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              <ArrowLeft size={16} />
              Retour aux produits
            </Link>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 rounded-xl border border-brand-gold bg-brand-gold px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-yellow-600"
            >
              <Package size={16} />
              Créer un produit
            </Link>
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
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-slate-500">Raccourci clavier: Ctrl/Cmd + S</p>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isDirty ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {isDirty ? <CircleAlert size={13} /> : <CheckCircle2 size={13} />}
            {isDirty ? "Modifications non sauvegardées" : "Synchronisé"}
          </span>
        </div>

        <form id="admin-product-form" onSubmit={onSubmit} className="space-y-5">
          <fieldset className="space-y-4">
            <legend className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              Identité
            </legend>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">Catégorie</label>
              <select
                value={form.categoryId}
                onChange={(event) => setForm((current) => ({ ...current, categoryId: event.target.value }))}
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
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
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
                onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))}
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
                onChange={(event) => setForm((current) => ({ ...current, gallery: event.target.value }))}
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
                onChange={(event) => setForm((current) => ({ ...current, features: event.target.value }))}
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
                onChange={(event) => setForm((current) => ({ ...current, advantages: event.target.value }))}
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
              <Save size={16} />
              {saving ? "Enregistrement..." : mode === "edit" ? "Mettre à jour" : "Créer le produit"}
            </button>
            <Link
              href="/admin/products"
              className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              Retour liste
            </Link>
          </div>
        </form>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur xl:hidden">
        <div className="mx-auto flex max-w-5xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-700">
              {mode === "edit" ? "Édition en cours" : "Nouveau produit"}
            </p>
            <p className="text-[11px] text-slate-500">
              {isDirty ? "Changements non enregistrés" : "Aucun changement en attente"}
            </p>
          </div>
          <button
            type="submit"
            form="admin-product-form"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gold px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-yellow-600 disabled:opacity-70"
          >
            <Save size={14} />
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}

