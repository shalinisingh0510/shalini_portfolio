-- Run this in Supabase SQL Editor.
-- It creates contact + blog tables with RLS and sensible defaults.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 2 and 120),
  email text not null check (position('@' in email) > 1),
  message text not null check (char_length(trim(message)) between 10 and 5000),
  status text not null default 'new' check (status in ('new', 'reviewed', 'replied', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_contact_messages_created_at
  on public.contact_messages (created_at desc);

drop trigger if exists trg_contact_messages_updated_at on public.contact_messages;
create trigger trg_contact_messages_updated_at
before update on public.contact_messages
for each row execute function public.set_updated_at();

alter table public.contact_messages enable row level security;

drop policy if exists "Allow public insert contact messages" on public.contact_messages;
create policy "Allow public insert contact messages"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "Allow authenticated read contact messages" on public.contact_messages;
create policy "Allow authenticated read contact messages"
on public.contact_messages
for select
to authenticated
using (true);

drop policy if exists "Allow authenticated update contact messages" on public.contact_messages;
create policy "Allow authenticated update contact messages"
on public.contact_messages
for update
to authenticated
using (true)
with check (true);

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists trg_blog_categories_updated_at on public.blog_categories;
create trigger trg_blog_categories_updated_at
before update on public.blog_categories
for each row execute function public.set_updated_at();

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  author_name text not null default 'Shalini Kumari',
  category_id uuid references public.blog_categories(id) on delete set null,
  is_published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint blog_posts_published_at_check
    check ((is_published = false) or (published_at is not null))
);

create index if not exists idx_blog_posts_slug on public.blog_posts (slug);
create index if not exists idx_blog_posts_published on public.blog_posts (is_published, published_at desc);

drop trigger if exists trg_blog_posts_updated_at on public.blog_posts;
create trigger trg_blog_posts_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

create table if not exists public.blog_tags (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_post_tags (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  tag_id uuid not null references public.blog_tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_tags enable row level security;
alter table public.blog_post_tags enable row level security;

drop policy if exists "Public can read categories" on public.blog_categories;
create policy "Public can read categories"
on public.blog_categories
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated can manage categories" on public.blog_categories;
create policy "Authenticated can manage categories"
on public.blog_categories
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read published posts" on public.blog_posts;
create policy "Public can read published posts"
on public.blog_posts
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "Authenticated can manage posts" on public.blog_posts;
create policy "Authenticated can manage posts"
on public.blog_posts
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read tags" on public.blog_tags;
create policy "Public can read tags"
on public.blog_tags
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated can manage tags" on public.blog_tags;
create policy "Authenticated can manage tags"
on public.blog_tags
for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public can read post tags" on public.blog_post_tags;
create policy "Public can read post tags"
on public.blog_post_tags
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated can manage post tags" on public.blog_post_tags;
create policy "Authenticated can manage post tags"
on public.blog_post_tags
for all
to authenticated
using (true)
with check (true);
