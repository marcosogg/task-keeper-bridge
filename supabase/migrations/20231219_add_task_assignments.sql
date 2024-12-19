-- Check if columns exist before adding them
do $$ 
begin
    if not exists (select 1 from information_schema.columns 
                  where table_schema = 'public' 
                  and table_name = 'tasks' 
                  and column_name = 'assigned_to') then
        alter table public.tasks 
        add column assigned_to uuid references public.profiles(id) on delete set null,
        add column assigned_at timestamp with time zone;
    end if;
end $$;

-- Create index for task assignments if it doesn't exist
create index if not exists idx_tasks_assigned_to on public.tasks(assigned_to);

-- Create function to notify members of task assignments
create or replace function public.handle_task_assignment()
returns trigger as $$
declare
    task_title text;
begin
    -- If there's a new assignment
    if (TG_OP = 'UPDATE' and new.assigned_to is not null and 
        (old.assigned_to is null or old.assigned_to != new.assigned_to)) then
        -- Update assigned_at timestamp
        new.assigned_at = timezone('utc'::text, now());
        
        -- Get task title for notification
        task_title := new.title;
        
        -- Insert notification for the assigned member
        insert into public.notifications (
            profile_id,
            type,
            content,
            related_id,
            created_at
        ) values (
            new.assigned_to,
            'task_assignment',
            format('You have been assigned a new task: %s', task_title),
            new.id,
            timezone('utc'::text, now())
        );
    end if;
    
    return new;
end;
$$ language plpgsql security definer;

-- Drop the trigger if it exists to avoid conflicts
drop trigger if exists on_task_assignment on public.tasks;

-- Create trigger for task assignments
create trigger on_task_assignment
    before update on public.tasks
    for each row execute function public.handle_task_assignment();
