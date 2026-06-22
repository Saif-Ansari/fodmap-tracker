-- Run this in Supabase SQL Editor
-- Dashboard → SQL Editor (>_ icon on left sidebar) → New query → paste → Run

-- MEALS table
create table meals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  date date not null,
  meal_time text not null,
  time text not null,
  foods text not null,
  notes text,
  created_at timestamptz default now()
);

-- MOVEMENTS table
create table movements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  date date not null,
  time text not null,
  urgency text not null,
  notes text,
  minutes_after_waking integer,
  created_at timestamptz default now()
);

-- Row Level Security — users can only see their own data
alter table meals enable row level security;
alter table movements enable row level security;

create policy "own meals" on meals for all using (auth.uid() = user_id);
create policy "own movements" on movements for all using (auth.uid() = user_id);
