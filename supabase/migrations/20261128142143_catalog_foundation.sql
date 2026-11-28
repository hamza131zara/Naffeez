
-- Naffeez catalog foundation.
-- No customer/order/payment/authentication workflows are created in this migration.

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema public to anon, authenticated, service_role;
grant usage on schema private to service_role;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid null references public.categories(id) on delete restrict,
  name text not null check (length(btrim(name)) > 0),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description text null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint categories_parent_not_self check (parent_id is null or parent_id <> id)
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) > 0),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description text null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  starts_at timestamptz null,
  ends_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint collections_valid_window check (starts_at is null or ends_at is null or ends_at > starts_at)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(btrim(title)) > 0),
  description text null,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  base_price_minor bigint not null check (base_price_minor >= 0),
  category_id uuid null references public.categories(id) on delete set null,
  material text null,
  fit text null,
  season text null,
  published_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint products_published_timestamp check (status <> 'published' or published_at is not null)
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text null unique check (sku is null or length(btrim(sku)) > 0),
  size_label text null,
  color_name text null,
  color_code text null,
  price_override_minor bigint null check (price_override_minor is null or price_override_minor >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint product_variants_id_product_unique unique (id, product_id)
);

create table public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null unique check (length(btrim(storage_path)) > 0),
  alt_text text null,
  sort_order integer not null default 0,
  media_role text not null default 'gallery',
  variant_id uuid null,
  zoom_storage_path text null,
  detail_label text null,
  created_at timestamptz not null default now(),
  constraint product_media_variant_same_product_fk
    foreign key (variant_id, product_id)
    references public.product_variants(id, product_id)
    on delete set null (variant_id)
);

create table public.inventory_levels (
  variant_id uuid primary key references public.product_variants(id) on delete restrict,
  quantity_on_hand integer not null default 0 check (quantity_on_hand >= 0),
  quantity_reserved integer not null default 0 check (quantity_reserved >= 0 and quantity_reserved <= quantity_on_hand),
  low_stock_threshold integer not null default 0 check (low_stock_threshold >= 0),
  is_in_stock boolean generated always as (quantity_on_hand > quantity_reserved) stored,
  updated_at timestamptz not null default now()
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references public.product_variants(id) on delete restrict,
  movement_type text not null check (length(btrim(movement_type)) > 0),
  quantity_delta integer not null check (quantity_delta <> 0),
  reason text null,
  reference_type text null,
  reference_id uuid null,
  actor_id uuid null references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.collection_products (
  collection_id uuid not null references public.collections(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (collection_id, product_id)
);

create table private.admin_memberships (
  user_id uuid primary key references auth.users(id) on delete restrict,
  role text not null check (length(btrim(role)) > 0),
  is_active boolean not null default true,
  granted_by uuid null references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table private.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid null references auth.users(id) on delete set null,
  action text not null check (length(btrim(action)) > 0),
  entity_type text not null check (length(btrim(entity_type)) > 0),
  entity_id uuid null,
  before_json jsonb null,
  after_json jsonb null,
  request_id text null,
  created_at timestamptz not null default now()
);

create table private.store_settings (
  key text primary key check (length(btrim(key)) > 0),
  value_json jsonb not null default '{}'::jsonb,
  updated_by uuid null references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create index categories_active_order_idx on public.categories (is_active, sort_order);
create index products_status_published_idx on public.products (status, published_at desc);
create index products_category_status_idx on public.products (category_id, status);
create index product_variants_product_active_idx on public.product_variants (product_id, is_active);
create index product_media_product_order_idx on public.product_media (product_id, sort_order);
create index inventory_movements_variant_created_idx on public.inventory_movements (variant_id, created_at desc);
create index collection_products_product_idx on public.collection_products (product_id);

alter table public.categories enable row level security;
alter table public.collections enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_media enable row level security;
alter table public.inventory_levels enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.collection_products enable row level security;

alter table private.admin_memberships enable row level security;
alter table private.audit_events enable row level security;
alter table private.store_settings enable row level security;

create policy "Public can read active categories"
  on public.categories for select to anon, authenticated
  using (is_active = true);

create policy "Public can read published collections"
  on public.collections for select to anon, authenticated
  using (
    status = 'published'
    and (starts_at is null or starts_at <= now())
    and (ends_at is null or ends_at > now())
  );

create policy "Public can read published products"
  on public.products for select to anon, authenticated
  using (
    status = 'published'
    and (
      category_id is null
      or exists (
        select 1 from public.categories c
        where c.id = products.category_id and c.is_active = true
      )
    )
  );

create policy "Public can read active variants of published products"
  on public.product_variants for select to anon, authenticated
  using (
    is_active = true
    and exists (
      select 1 from public.products p
      where p.id = product_variants.product_id and p.status = 'published'
    )
  );

create policy "Public can read media for published products"
  on public.product_media for select to anon, authenticated
  using (
    exists (
      select 1
      from public.products p
      where p.id = product_media.product_id
        and p.status = 'published'
        and (
          p.category_id is null
          or exists (
            select 1 from public.categories c
            where c.id = p.category_id and c.is_active = true
          )
        )
    )
    and (
      variant_id is null
      or exists (
        select 1 from public.product_variants v
        where v.id = product_media.variant_id
          and v.product_id = product_media.product_id
          and v.is_active = true
      )
    )
  );

create policy "Public can read availability for published variants"
  on public.inventory_levels for select to anon, authenticated
  using (
    exists (
      select 1
      from public.product_variants v
      join public.products p on p.id = v.product_id
      where v.id = inventory_levels.variant_id
        and v.is_active = true
        and p.status = 'published'
    )
  );

create policy "Public can read published collection products"
  on public.collection_products for select to anon, authenticated
  using (
    exists (
      select 1 from public.collections c
      where c.id = collection_products.collection_id
        and c.status = 'published'
        and (c.starts_at is null or c.starts_at <= now())
        and (c.ends_at is null or c.ends_at > now())
    )
    and exists (
      select 1 from public.products p
      where p.id = collection_products.product_id and p.status = 'published'
    )
  );

revoke all on table
  public.categories,
  public.collections,
  public.products,
  public.product_variants,
  public.product_media,
  public.inventory_levels,
  public.inventory_movements,
  public.collection_products
from public, anon, authenticated;

grant select on table
  public.categories,
  public.collections,
  public.products,
  public.product_variants,
  public.product_media,
  public.collection_products
to anon, authenticated;

grant select (variant_id, is_in_stock)
  on public.inventory_levels
  to anon, authenticated;

grant all privileges on table
  public.categories,
  public.collections,
  public.products,
  public.product_variants,
  public.product_media,
  public.inventory_levels,
  public.inventory_movements,
  public.collection_products
to service_role;

grant select, insert, update, delete on table
  private.admin_memberships,
  private.audit_events,
  private.store_settings
to service_role;

insert into storage.buckets (id, name, public)
values ('product-media', 'product-media', false)
on conflict (id) do update set public = false;

create policy "Published product media can be signed"
  on storage.objects for select to anon, authenticated
  using (
    bucket_id = 'product-media'
    and exists (
      select 1
      from public.product_media pm
      join public.products p on p.id = pm.product_id
      left join public.product_variants v
        on v.id = pm.variant_id and v.product_id = pm.product_id
      where (pm.storage_path = storage.objects.name or pm.zoom_storage_path = storage.objects.name)
        and p.status = 'published'
        and (
          p.category_id is null
          or exists (
            select 1 from public.categories c
            where c.id = p.category_id and c.is_active = true
          )
        )
        and (pm.variant_id is null or v.is_active = true)
    )
  );
