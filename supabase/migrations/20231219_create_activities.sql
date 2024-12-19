-- Create activities table if it doesn't exist
create table if not exists public.activities (
    id uuid default gen_random_uuid() primary key,
    family_id uuid references public.families(id) on delete cascade not null,
    profile_id uuid references public.profiles(id) on delete cascade not null,
    type text not null,
    content jsonb not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better query performance
create index if not exists idx_activities_family_id on public.activities(family_id);
create index if not exists idx_activities_profile_id on public.activities(profile_id);
create index if not exists idx_activities_created_at on public.activities(created_at desc);

-- Enable RLS
alter table public.activities enable row level security;

-- Create RLS policies
create policy "Users can view activities from their families"
    on public.activities for select
    using (
        auth.uid() in (
            select profile_id
            from public.family_members
            where family_id = activities.family_id
        )
    );

create policy "Users can create activities in their families"
    on public.activities for insert
    with check (
        auth.uid() in (
            select profile_id
            from public.family_members
            where family_id = family_id
        )
    );

-- Create updated_at trigger
create trigger handle_updated_at
    before update on public.activities
    for each row
    execute procedure public.handle_updated_at();
