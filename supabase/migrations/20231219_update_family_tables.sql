-- Drop existing RLS policies for families table if they exist
drop policy if exists "Users can view their own families" on public.families;
drop policy if exists "Users can create families" on public.families;
drop policy if exists "Only admin members can update family details" on public.families;

-- Drop existing RLS policies for family_members table if they exist
drop policy if exists "Users can view members of their families" on public.family_members;
drop policy if exists "Admin members can add new members" on public.family_members;
drop policy if exists "Admin members can update member details" on public.family_members;
drop policy if exists "Admin members can remove members" on public.family_members;

-- Update families table if needed columns are missing
do $$ 
begin
    if not exists (select 1 from information_schema.columns where table_name = 'families' and column_name = 'updated_at') then
        alter table public.families add column updated_at timestamp with time zone default timezone('utc'::text, now()) not null;
    end if;
end $$;

-- Update family_members table if needed columns are missing
do $$ 
begin
    if not exists (select 1 from information_schema.columns where table_name = 'family_members' and column_name = 'role') then
        alter table public.family_members add column role text not null check (role in ('admin', 'member')) default 'member';
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'family_members' and column_name = 'status') then
        alter table public.family_members add column status text not null check (status in ('active', 'inactive', 'pending')) default 'active';
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'family_members' and column_name = 'joined_at') then
        alter table public.family_members add column joined_at timestamp with time zone default timezone('utc'::text, now());
    end if;

    if not exists (select 1 from information_schema.columns where table_name = 'family_members' and column_name = 'updated_at') then
        alter table public.family_members add column updated_at timestamp with time zone default timezone('utc'::text, now()) not null;
    end if;
end $$;

-- Create or replace updated_at function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

-- Create updated_at trigger for families if it doesn't exist
do $$ 
begin
    if not exists (select 1 from pg_trigger where tgname = 'handle_updated_at' and tgrelid = 'public.families'::regclass) then
        create trigger handle_updated_at
            before update on public.families
            for each row
            execute procedure public.handle_updated_at();
    end if;
end $$;

-- Create updated_at trigger for family_members if it doesn't exist
do $$ 
begin
    if not exists (select 1 from pg_trigger where tgname = 'handle_updated_at' and tgrelid = 'public.family_members'::regclass) then
        create trigger handle_updated_at
            before update on public.family_members
            for each row
            execute procedure public.handle_updated_at();
    end if;
end $$;

-- Enable RLS if not already enabled
alter table public.families enable row level security;
alter table public.family_members enable row level security;

-- Create new RLS policies for families table
create policy "Users can view their own families"
    on public.families for select
    using (
        auth.uid() in (
            select profile_id
            from public.family_members
            where family_id = id
        )
    );

create policy "Users can create families"
    on public.families for insert
    with check (auth.uid() = created_by);

create policy "Only admin members can update family details"
    on public.families for update
    using (
        auth.uid() in (
            select profile_id
            from public.family_members
            where family_id = id
            and role = 'admin'
        )
    );

-- Create new RLS policies for family_members table
create policy "Users can view members of their families"
    on public.family_members for select
    using (
        auth.uid() in (
            select profile_id
            from public.family_members fm
            where fm.family_id = family_id
        )
    );

create policy "Admin members can add new members"
    on public.family_members for insert
    with check (
        auth.uid() in (
            select profile_id
            from public.family_members
            where family_id = family_id
            and role = 'admin'
        )
        or (
            -- Allow users to add themselves when creating a new family
            auth.uid() = profile_id
            and not exists (
                select 1
                from public.family_members
                where family_id = family_id
            )
        )
    );

create policy "Admin members can update member details"
    on public.family_members for update
    using (
        auth.uid() in (
            select profile_id
            from public.family_members
            where family_id = family_id
            and role = 'admin'
        )
    );

create policy "Admin members can remove members"
    on public.family_members for delete
    using (
        auth.uid() in (
            select profile_id
            from public.family_members
            where family_id = family_id
            and role = 'admin'
        )
    );
