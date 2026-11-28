export type ProductImage = {
  id: string;
  src: string;
  alt: string;
  sortOrder: number;
  mediaRole: string | null;
  variantId?: string | null;
  zoomSrc?: string | null;
  detailLabel?: string | null;
};

export type ProductVariant = {
  id: string;
  sku: string | null;
  sizeLabel: string | null;
  colorName: string | null;
  colorCode: string | null;
  priceOverrideMinor: number | null;
  isActive: boolean;
  availableQuantity: number | null;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  basePriceMinor: number;
  categoryId: string | null;
  images: ProductImage[];
  variants: ProductVariant[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sortOrder: number;
};