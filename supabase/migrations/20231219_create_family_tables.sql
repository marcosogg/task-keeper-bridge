-- Create families table
create table public.families (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    created_by uuid references auth.users(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for families table
alter table public.families enable row level security;

-- Create family_members table
create table public.family_members (
    id uuid default gen_random_uuid() primary key,
    family_id uuid references public.families(id) on delete cascade not null,
    profile_id uuid references public.profiles(id) on delete cascade not null,
    role text not null check (role in ('admin', 'member')),
    status text not null check (status in ('active', 'inactive', 'pending')) default 'active',
    joined_at timestamp with time zone default timezone('utc'::text, now()),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (family_id, profile_id)
);

-- Enable RLS for family_members table
alter table public.family_members enable row level security;

-- Create updated_at function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

-- Create updated_at trigger for families
create trigger handle_updated_at
    before update on public.families
    for each row
    execute procedure public.handle_updated_at();

-- Create updated_at trigger for family_members
create trigger handle_updated_at
    before update on public.family_members
    for each row
    execute procedure public.handle_updated_at();

-- RLS Policies for families table
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

-- RLS Policies for family_members table
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
