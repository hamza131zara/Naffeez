
-- Defense-in-depth deny policies for tables that must remain server-only.
create policy "No direct client access to inventory movements"
  on public.inventory_movements for all to anon, authenticated
  using (false)
  with check (false);

create policy "No direct client access to admin memberships"
  on private.admin_memberships for all to anon, authenticated
  using (false)
  with check (false);

create policy "No direct client access to audit events"
  on private.audit_events for all to anon, authenticated
  using (false)
  with check (false);

create policy "No direct client access to store settings"
  on private.store_settings for all to anon, authenticated
  using (false)
  with check (false);

-- Cover foreign keys used by joins and delete/update checks.
create index categories_parent_id_idx
  on public.categories (parent_id);

create index product_media_variant_product_idx
  on public.product_media (variant_id, product_id)
  where variant_id is not null;

create index inventory_movements_actor_created_idx
  on public.inventory_movements (actor_id, created_at desc)
  where actor_id is not null;

create index admin_memberships_granted_by_idx
  on private.admin_memberships (granted_by)
  where granted_by is not null;

create index audit_events_actor_created_idx
  on private.audit_events (actor_id, created_at desc)
  where actor_id is not null;

create index store_settings_updated_by_idx
  on private.store_settings (updated_by)
  where updated_by is not null;
