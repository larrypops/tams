import "server-only";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { getGithubEnvOrNull } from "@/src/lib/env/server";
import type {
  Product,
  ProductCatalog,
  ProductUpsertInput,
} from "@/src/lib/content/types";

const PRODUCTS_JSON_PATH = path.join(process.cwd(), "data", "products.json");
const GITHUB_PRODUCTS_PATH = "data/products.json";

type GithubFile = {
  content: string;
  sha: string;
  encoding: string;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function assertNonEmptyString(value: unknown, field: string) {
  const trimmed = toTrimmedString(value);
  if (!trimmed) throw new Error(`Field "${field}" is required`);
  return trimmed;
}

function normalizeList(value: unknown, field: string) {
  if (!Array.isArray(value)) throw new Error(`Field "${field}" must be an array`);
  const cleaned = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
  if (!cleaned.length) throw new Error(`Field "${field}" must contain at least one item`);
  return cleaned;
}

function isValidImageUrl(value: string) {
  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://");
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ensureUniqueId(products: Product[], desiredId: string, excludeId?: string) {
  let candidate = desiredId;
  let suffix = 2;
  while (products.some((p) => p.id === candidate && p.id !== excludeId)) {
    candidate = `${desiredId}-${suffix++}`;
  }
  return candidate;
}

function parseCatalog(data: string) {
  const parsed = JSON.parse(data) as ProductCatalog;
  if (!Array.isArray(parsed?.products) || !Array.isArray(parsed?.categories)) {
    throw new Error("Invalid products catalog structure");
  }
  return parsed;
}

async function readLocalCatalog() {
  const raw = await readFile(PRODUCTS_JSON_PATH, "utf8");
  return parseCatalog(raw);
}

async function writeLocalCatalog(catalog: ProductCatalog) {
  await writeFile(PRODUCTS_JSON_PATH, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
}

async function githubGetFile() {
  const env = getGithubEnvOrNull();
  if (!env) return null;

  const url = `https://api.github.com/repos/${env.owner}/${env.repo}/contents/${GITHUB_PRODUCTS_PATH}?ref=${encodeURIComponent(env.branch)}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "tams-admin-cms",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GitHub read failed (${response.status})`);
  }

  const file = (await response.json()) as GithubFile;
  if (!file.content || !file.sha) {
    throw new Error("Invalid GitHub file payload");
  }

  const decoded = Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8");
  return {
    catalog: parseCatalog(decoded),
    sha: file.sha,
    env,
  };
}

async function githubPutFile(catalog: ProductCatalog, sha: string, message: string) {
  const env = getGithubEnvOrNull();
  if (!env) throw new Error("GitHub environment variables are missing");

  const url = `https://api.github.com/repos/${env.owner}/${env.repo}/contents/${GITHUB_PRODUCTS_PATH}`;
  const content = Buffer.from(`${JSON.stringify(catalog, null, 2)}\n`, "utf8").toString("base64");

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${env.token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "tams-admin-cms",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      content,
      sha,
      branch: env.branch,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`GitHub update failed (${response.status}): ${errorBody}`);
  }
}

async function loadCatalog() {
  const githubEnv = getGithubEnvOrNull();
  if (githubEnv) {
    const remote = await githubGetFile();
    if (!remote) throw new Error("GitHub is enabled but file could not be loaded");
    return { catalog: remote.catalog, source: "github" as const, sha: remote.sha };
  }
  const localCatalog = await readLocalCatalog();
  return { catalog: localCatalog, source: "local" as const, sha: null };
}

async function persistCatalog(
  catalog: ProductCatalog,
  source: "github" | "local",
  sha: string | null,
  message: string,
) {
  if (source === "github") {
    if (!sha) throw new Error("Missing GitHub SHA for update");
    await githubPutFile(catalog, sha, message);
    return;
  }
  await writeLocalCatalog(catalog);
}

function validateProductInput(
  input: unknown,
  categories: ProductCatalog["categories"],
  existingProducts: Product[],
  options?: { existingId?: string },
) {
  if (!isObject(input)) throw new Error("Invalid payload");

  const categoryId = assertNonEmptyString(input.categoryId, "categoryId");
  const categoryExists = categories.some((category) => category.id === categoryId);
  if (!categoryExists) throw new Error("Invalid categoryId");

  const title = assertNonEmptyString(input.title, "title");
  const shortTitle = assertNonEmptyString(input.shortTitle, "shortTitle");
  const description = assertNonEmptyString(input.description, "description");
  const image = assertNonEmptyString(input.image, "image");
  if (!isValidImageUrl(image)) throw new Error("image must be a relative path or URL");

  const features = normalizeList(input.features, "features");
  const applications = normalizeList(input.applications, "applications");
  const advantages = normalizeList(input.advantages, "advantages");

  const galleryRaw = Array.isArray(input.gallery) ? input.gallery : [];
  const gallery = galleryRaw
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item && isValidImageUrl(item));
  if (!gallery.length) gallery.push(image);

  const availability =
    input.availability === "coming-soon" ? "coming-soon" : "available";

  const incomingId = toTrimmedString(input.id);
  const baseId = options?.existingId || incomingId || slugify(shortTitle || title) || "produit";
  const id = ensureUniqueId(existingProducts, baseId, options?.existingId);

  const product: ProductUpsertInput = {
    id,
    categoryId,
    title,
    shortTitle,
    description,
    image,
    gallery,
    features,
    applications,
    advantages,
    availability,
  };

  return product;
}

export async function getProductsCatalog() {
  const { catalog } = await loadCatalog();
  return catalog;
}

export async function createProduct(input: unknown) {
  const loaded = await loadCatalog();
  const product = validateProductInput(
    input,
    loaded.catalog.categories,
    loaded.catalog.products,
  ) as Product;

  loaded.catalog.products.unshift(product);
  await persistCatalog(
    loaded.catalog,
    loaded.source,
    loaded.sha,
    `cms(products): create ${product.id}`,
  );

  return product;
}

export async function updateProduct(id: string, input: unknown) {
  const loaded = await loadCatalog();
  const index = loaded.catalog.products.findIndex((product) => product.id === id);
  if (index === -1) throw new Error("Product not found");

  const product = validateProductInput(
    input,
    loaded.catalog.categories,
    loaded.catalog.products,
    { existingId: id },
  ) as Product;

  loaded.catalog.products[index] = product;
  await persistCatalog(
    loaded.catalog,
    loaded.source,
    loaded.sha,
    `cms(products): update ${id}`,
  );

  return product;
}

export async function deleteProduct(id: string) {
  const loaded = await loadCatalog();
  const previousLength = loaded.catalog.products.length;
  loaded.catalog.products = loaded.catalog.products.filter((product) => product.id !== id);
  if (loaded.catalog.products.length === previousLength) {
    throw new Error("Product not found");
  }

  await persistCatalog(
    loaded.catalog,
    loaded.source,
    loaded.sha,
    `cms(products): delete ${id}`,
  );
}

