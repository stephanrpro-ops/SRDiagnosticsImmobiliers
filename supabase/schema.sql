create table if not exists admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  client_number text not null unique,
  name text not null,
  email text not null,
  phone text not null,
  created_at timestamptz not null default now()
);

create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  address_label text not null,
  created_at timestamptz not null default now()
);

create table if not exists missions (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  mission_date date not null,
  created_at timestamptz not null default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  file_path text not null,
  file_name text not null,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  amount numeric(10,2) not null,
  status text not null check (status in ('payee','en_attente','impayee')),
  issued_at date,
  due_at date,
  payment_url text,
  created_at timestamptz not null default now()
);

create table if not exists access_tokens (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists one_active_token_per_client
on access_tokens(client_id)
where revoked_at is null;

create table if not exists quote_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  data_json jsonb not null,
  recommended_diags_json jsonb not null,
  billed_diags_json jsonb not null,
  pack_count int,
  pack_price numeric(10,2),
  status text not null default 'new',
  slot_preferences_json jsonb,
  consent_json jsonb
);
