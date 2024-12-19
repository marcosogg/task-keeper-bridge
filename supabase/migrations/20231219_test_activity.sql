-- Insert a test activity for the first family member we find
with first_member as (
    select 
        fm.profile_id,
        fm.family_id
    from public.family_members fm
    limit 1
)
insert into public.activities (
    family_id,
    profile_id,
    type,
    content,
    created_at
)
select 
    family_id,
    profile_id,
    'test_activity',
    '{"message": "Test activity created"}'::jsonb,
    now()
from first_member
returning *;
