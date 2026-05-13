-- Migration: create agency_leads table
-- Project: ait-agency (virieiauymwokxnbeotx)
-- Date: 2026-05-09

create table if not exists agency_leads (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  email            text not null,
  company          text not null,
  role             text,
  process_to_automate text,
  monthly_revenue  text,
  created_at       timestamptz not null default now()
);

-- Index for fast lookup by email
create index if not exists agency_leads_email_idx on agency_leads (email);

-- RLS: service role bypasses; anon cannot read/write
alter table agency_leads enable row level security;

-- No public read/write — only service role can insert
-- (intake route uses service role key)
