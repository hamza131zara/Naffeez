import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Category, Product, ProductImage, ProductVariant } from "./types";
import { getAvailableQuantity } from "./availability.mjs";

type RawImage = {
  id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number | null;
  media_role: string | null;
  zoom_storage_path: string | null;
  detail_label: string | null;
  variant_id: string | null;
};

type RawVariant = {
  id: string;
  sku: string | null;
  size_label: string | null;
  color_name: string | null;
  color_code: string | null;
  price_override_minor: number | null;
  is_active: boolean;
  inventory_levels?: { quantity_on_hand: number; quantity_reserved: number }[] | null;
};

type RawProduct = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  base_price_minor: number;
  category_id: string | null;
  product_media?: RawImage[] | null;
  product_variants?: RawVariant[] | null;
};

function mapProduct(
  client: NonNullable<Awaited<ReturnType<typeof createSupabaseServerClient>>>,
  row: RawProduct
): Product {
  const images: ProductImage[] = (row.product_media ?? [])
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map((image) => {
      const { data } = client.storage.from("product-media").getPublicUrl(image.storage_path);
      return {
        id: image.id,
        src: data.publicUrl,
        alt: image.alt_text || row.title,
        sortOrder: image.sort_order ?? 0,
        mediaRole: image.media_role,
        zoomSrc: null,
        detailLabel: null
      };
    });

  const variants: ProductVariant[] = (row.product_variants ?? []).map((variant) => {
    const level = variant.inventory_levels?.[0];
    const available = level
      ? getAvailableQuantity(level.quantity_on_hand, level.quantity_reserved)
      : null;
    return {
      id: variant.id,
      sku: variant.sku,
      sizeLabel: variant.size_label,
      colorName: variant.color_name,
      colorCode: variant.color_code,
      priceOverrideMinor: variant.price_override_minor,
      isActive: variant.is_active,
      availableQuantity: available
    };
  });

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    basePriceMinor: row.base_price_minor,
    categoryId: row.category_id,
    images,
    variants
  };
}

const PRODUCT_SELECT = `
  id, slug, title, description, base_price_minor, category_id,
  product_media(id, storage_path, alt_text, sort_order, media_role),
  product_variants(
    id, sku, size_label, color_name, color_code, price_override_minor, is_active,
    inventory_levels(quantity_on_hand, quantity_reserved)
  )
`;

export async function getPublishedProducts(options?: {
  categorySlug?: string;
  search?: string;
  limit?: number;
}): Promise<{ products: Product[]; configured: boolean; unavailable: boolean }> {
  const client = await createSupabaseServerClient();
  if (!client) return { products: [], configured: false, unavailable: false };

  let query = client
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(options?.limit ?? 24);

  if (options?.categorySlug) {
    const { data: category } = await client
      .from("categories")
      .select("id")
      .eq("slug", options.categorySlug)
      .eq("is_active", true)
      .maybeSingle();

    if (!category?.id) return { products: [], configured: true, unavailable: false };
    query = query.eq("category_id", category.id);
  }

  if (options?.search?.trim()) {
    const term = options.search.trim().replace(/[%]/g, " ").slice(0, 80);
    query = query.ilike("title", "%" + term + "%");
  }

  const { data, error } = await query;
  if (error || !data) {
    console.error("[catalog] Product query failed", { code: error?.code });
    return { products: [], configured: true, unavailable: true };
  }

  return {
    products: (data as unknown as RawProduct[]).map((row) => mapProduct(client, row)),
    configured: true,
    unavailable: false
  };
}

export async function getPublishedProductBySlug(slug: string): Promise<Product | null> {
  const client = await createSupabaseServerClient();
  if (!client) return null;

  const { data, error } = await client
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[catalog] Product detail query failed", { code: error.code });
    return null;
  }

  return data ? mapProduct(client, data as unknown as RawProduct) : null;
}

export async function getActiveCategories(): Promise<Category[]> {
  const client = await createSupabaseServerClient();
  if (!client) return [];

  const { data, error } = await client
    .from("categories")
    .select("id, name, slug, description, sort_order")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    console.error("[catalog] Category query failed", { code: error?.code });
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    sortOrder: row.sort_order
  })) as Category[];
}

export async function getPublishedProductsByIds(ids: string[]): Promise<Product[]> {
  const safeIds = [...new Set(ids.filter((id) => /^[0-9a-f-]{36}$/i.test(id)))].slice(0, 50);
  if (!safeIds.length) return [];

  const client = await createSupabaseServerClient();
  if (!client) return [];

  const { data, error } = await client
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("status", "published")
    .in("id", safeIds);

  if (error || !data) {
    console.error("[catalog] Saved product query failed", { code: error?.code });
    return [];
  }

  return (data as unknown as RawProduct[]).map((row) => mapProduct(client, row));
}