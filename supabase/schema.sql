create extension if not exists pgcrypto;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  role text not null check (role in ('admin', 'client')) default 'client',
  name text,
  email text not null unique,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete set null,
  address_label text not null,
  postcode text,
  city text,
  year_built int,
  property_type text,
  is_copro boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists quotes_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  data_json jsonb not null,
  status text not null default 'new'
);

create table if not exists missions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  property_id uuid references properties(id) on delete set null,
  scheduled_at timestamptz,
  status text not null check (status in ('a_planifier', 'en_cours', 'rapport_envoye', 'clos')) default 'a_planifier',
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  file_path text not null,
  file_name text not null,
  type text not null default 'rapport',
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  number text not null unique,
  amount numeric(10,2) not null,
  issued_at date,
  due_at date,
  status text not null check (status in ('brouillon','envoyee','payee','partiel','impayee','relance1','relance2','mise_en_demeure')) default 'brouillon',
  created_at timestamptz not null default now()
);

create table if not exists reminders (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  sent_at timestamptz not null default now(),
  channel text not null default 'email',
  note text
);

create table if not exists news_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  rss_url text not null unique,
  enabled boolean not null default true,
  tags_json jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists news_items (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references news_sources(id) on delete cascade,
  title text not null,
  url text not null unique,
  published_at timestamptz,
  tags_json jsonb not null default '[]'::jsonb,
  summary text,
  status text not null check (status in ('draft','published')) default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists content_blocks (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text,
  body text,
  updated_at timestamptz not null default now()
);

alter table clients enable row level security;
alter table properties enable row level security;
alter table missions enable row level security;
alter table documents enable row level security;
alter table invoices enable row level security;
alter table reminders enable row level security;
alter table news_sources enable row level security;
alter table news_items enable row level security;
alter table content_blocks enable row level security;

create or replace function is_admin() returns boolean language sql stable as $$
  select exists (
    select 1 from users u
    where u.auth_user_id = auth.uid() and u.role = 'admin'
  );
$$;

create policy "admin full access clients" on clients for all using (is_admin()) with check (is_admin());
create policy "admin full access properties" on properties for all using (is_admin()) with check (is_admin());
create policy "admin full access missions" on missions for all using (is_admin()) with check (is_admin());
create policy "admin full access documents" on documents for all using (is_admin()) with check (is_admin());
create policy "admin full access invoices" on invoices for all using (is_admin()) with check (is_admin());
create policy "admin full access reminders" on reminders for all using (is_admin()) with check (is_admin());
create policy "admin full access news_sources" on news_sources for all using (is_admin()) with check (is_admin());
create policy "admin full access news_items" on news_items for all using (is_admin()) with check (is_admin());
create policy "admin full access content_blocks" on content_blocks for all using (is_admin()) with check (is_admin());

create policy "client read own missions" on missions
for select using (
  exists (
    select 1
    from clients c
    join users u on u.id = c.user_id
    where c.id = missions.client_id and u.auth_user_id = auth.uid()
  )
);

create policy "client read own documents" on documents
for select using (
  exists (
    select 1
    from missions m
    join clients c on c.id = m.client_id
    join users u on u.id = c.user_id
    where m.id = documents.mission_id and u.auth_user_id = auth.uid()
  )
);

create policy "client read own invoices" on invoices
for select using (
  exists (
    select 1
    from missions m
    join clients c on c.id = m.client_id
    join users u on u.id = c.user_id
    where m.id = invoices.mission_id and u.auth_user_id = auth.uid()
  )
);

insert into users (role, name, email, phone)
values ('admin', 'Admin Placeholder', 'admin@example.com', '0700000000')
on conflict (email) do nothing;
