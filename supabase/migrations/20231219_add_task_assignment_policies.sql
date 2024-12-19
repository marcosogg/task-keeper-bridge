-- Enable RLS on tasks table if not already enabled
alter table public.tasks enable row level security;

-- Policy for viewing tasks: Users can view tasks in their family groups
create policy "Users can view family tasks"
on public.tasks for select
using (
    auth.uid() in (
        select profile_id 
        from public.family_members 
        where family_id = tasks.family_id
    )
);

-- Policy for creating tasks: Users can create tasks in their family groups
create policy "Users can create family tasks"
on public.tasks for insert
with check (
    auth.uid() in (
        select profile_id 
        from public.family_members 
        where family_id = family_id
    )
);

-- Policy for updating tasks: Users can update tasks they created or are assigned to
create policy "Users can update their tasks"
on public.tasks for update
using (
    auth.uid() = created_by or 
    auth.uid() = assigned_to or
    auth.uid() in (
        select profile_id 
        from public.family_members 
        where family_id = tasks.family_id and 
        role = 'admin'
    )
);

-- Policy for deleting tasks: Only task creators and family admins can delete tasks
create policy "Users can delete their tasks"
on public.tasks for delete
using (
    auth.uid() = created_by or
    auth.uid() in (
        select profile_id 
        from public.family_members 
        where family_id = tasks.family_id and 
        role = 'admin'
    )
);

-- Enable RLS on notifications table if not already enabled
alter table public.notifications enable row level security;

-- Policy for viewing notifications: Users can only view their own notifications
create policy "Users can view their notifications"
on public.notifications for select
using (profile_id = auth.uid());

-- Policy for updating notifications: Users can only update their own notifications (e.g., marking as read)
create policy "Users can update their notifications"
on public.notifications for update
using (profile_id = auth.uid());

-- Policy for system to create notifications
create policy "System can create notifications"
on public.notifications for insert
with check (true);  -- This allows the trigger to create notifications
