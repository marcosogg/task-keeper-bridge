-- Drop tables if they exist (to ensure clean state)
drop table if exists public.messages;
drop table if exists public.channel_members;
drop table if exists public.channels;

-- Step 1: Create tables
-- Create channels table
create table public.channels (
    id uuid default gen_random_uuid() primary key,
    family_id uuid references public.families(id) on delete cascade not null,
    name text not null,
    type text not null check (type in ('private', 'group')),
    created_by uuid references auth.users(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create channel_members table
create table public.channel_members (
    id uuid default gen_random_uuid() primary key,
    channel_id uuid not null,
    profile_id uuid not null,
    joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique (channel_id, profile_id),
    constraint fk_channel foreign key (channel_id) references public.channels(id) on delete cascade,
    constraint fk_profile foreign key (profile_id) references public.profiles(id) on delete cascade
);

-- Create messages table
create table public.messages (
    id uuid default gen_random_uuid() primary key,
    channel_id uuid not null,
    sender_id uuid not null,
    content text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint fk_message_channel foreign key (channel_id) references public.channels(id) on delete cascade,
    constraint fk_message_sender foreign key (sender_id) references auth.users(id) on delete cascade
);

-- Step 2: Create function and triggers
-- Create updated_at function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql security definer;

-- Create triggers for updated_at
create trigger on_channels_updated
    before update on public.channels
    for each row execute function public.handle_updated_at();

create trigger on_channel_members_updated
    before update on public.channel_members
    for each row execute function public.handle_updated_at();

create trigger on_messages_updated
    before update on public.messages
    for each row execute function public.handle_updated_at();
