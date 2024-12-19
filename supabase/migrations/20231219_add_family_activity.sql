-- Drop the existing function first
drop function if exists public.get_family_activity(uuid, integer);

-- Create or replace the get_family_activity function
create or replace function public.get_family_activity(
    family_id_param uuid,
    limit_param integer default 10
)
returns table (
    activity_id uuid,
    family_id uuid,
    profile_id uuid,
    type text,
    content jsonb,
    created_at timestamp with time zone,
    profile_name text,
    profile_avatar_url text
) as $$
declare
    activity_count integer;
    profile_count integer;
begin
    -- Log the input parameter
    raise notice 'Searching for activities with family_id: %', family_id_param;

    -- Verify that the family exists
    if not exists (select 1 from public.families where families.id = family_id_param) then
        raise exception 'Family not found with ID: %', family_id_param;
    end if;

    -- Get counts for debugging
    select count(*) into activity_count
    from public.activities a
    where a.family_id = family_id_param;

    select count(*) into profile_count
    from public.profiles p
    join public.activities a on a.profile_id = p.id
    where a.family_id = family_id_param;

    raise notice 'Found % activities and % profiles for family_id %', 
                 activity_count, profile_count, family_id_param;

    return query
    select 
        a.id as activity_id,
        a.family_id,
        a.profile_id,
        a.type,
        a.content,
        a.created_at,
        p.full_name as profile_name,
        p.avatar_url as profile_avatar_url
    from public.activities a
    join public.profiles p on p.id = a.profile_id
    where a.family_id = family_id_param
    order by a.created_at desc
    limit limit_param;
end;
$$ language plpgsql security definer;

-- Grant execute permission to authenticated users
grant execute on function public.get_family_activity(uuid, integer) to authenticated;
