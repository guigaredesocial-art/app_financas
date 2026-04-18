-- Tabela de transações
create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  description text not null,
  amount numeric(12, 2) not null,
  date date not null,
  type text check (type in ('receita', 'despesa')) not null,
  category text check (category in (
    'Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde',
    'Educação', 'Salário', 'Freelance', 'Outros'
  )) not null,
  created_at timestamptz default now() not null
);

-- Habilitar RLS
alter table public.transactions enable row level security;

-- Políticas RLS: cada usuário só vê e gerencia suas próprias transações
create policy "Users can view own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);

-- Índice para performance
create index if not exists transactions_user_id_date_idx
  on public.transactions (user_id, date desc);
