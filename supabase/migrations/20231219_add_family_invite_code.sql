-- Add invite_code column to families table
alter table public.families
add column if not exists invite_code text unique;

-- Create function to generate unique invite code
create or replace function generate_unique_invite_code()
returns text as $$
declare
    chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    code text := '';
    i integer;
begin
    -- Generate a 6-character code
    for i in 1..6 loop
        code := code || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    end loop;
    return code;
end;
$$ language plpgsql;

-- Create trigger function to set invite code on insert
create or replace function handle_family_invite_code()
returns trigger as $$
declare
    new_code text;
    max_attempts integer := 10;
    current_attempt integer := 0;
begin
    -- Only set invite code if it's not already set
    if new.invite_code is null then
        loop
            current_attempt := current_attempt + 1;
            new_code := generate_unique_invite_code();
            
            -- Check if code is unique
            if not exists (select 1 from public.families where invite_code = new_code) then
                new.invite_code := new_code;
                exit;
            end if;
            
            -- Prevent infinite loop
            if current_attempt >= max_attempts then
                raise exception 'Could not generate unique invite code after % attempts', max_attempts;
            end if;
        end loop;
    end if;
    
    return new;
end;
$$ language plpgsql;

-- Create trigger for invite code generation
drop trigger if exists on_family_invite_code on public.families;
create trigger on_family_invite_code
    before insert on public.families
    for each row execute function handle_family_invite_code();

-- Generate invite codes for existing families that don't have one
do $$
declare
    f record;
begin
    for f in select id from public.families where invite_code is null loop
        update public.families
        set invite_code = generate_unique_invite_code()
        where id = f.id;
    end loop;
end $$;
