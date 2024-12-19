-- Create notifications table
create table public.notifications (
    id uuid default gen_random_uuid() primary key,
    profile_id uuid references public.profiles(id) on delete cascade not null,
    type text not null,
    content text not null,
    related_id uuid,
    is_read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for notifications
create index idx_notifications_profile_id on public.notifications(profile_id);
create index idx_notifications_created_at on public.notifications(created_at desc);

-- Create updated_at trigger
create trigger on_notification_updated
    before update on public.notifications
    for each row execute function public.handle_updated_at();
