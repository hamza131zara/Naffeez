-- Approved Naffeez launch category taxonomy.
-- No products, prices, inventory, customer data, or demo orders are seeded.
insert into public.categories (name, slug, sort_order, is_active)
values
  ('Casual Shirts', 'casual-shirts', 10, true),
  ('Dress Shirts', 'dress-shirts', 20, true),
  ('Seasonal Trousers', 'seasonal-trousers', 30, true),
  ('Winter Trousers', 'winter-trousers', 40, true),
  ('Hoodies', 'hoodies', 50, true)
on conflict (slug) do nothing;
