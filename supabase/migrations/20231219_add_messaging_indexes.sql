-- Add indexes for the messaging tables
create index idx_channels_family_id on public.channels(family_id);
create index idx_channels_created_by on public.channels(created_by);

create index idx_channel_members_channel_id on public.channel_members(channel_id);
create index idx_channel_members_profile_id on public.channel_members(profile_id);

create index idx_messages_channel_id on public.messages(channel_id);
create index idx_messages_sender_id on public.messages(sender_id);
create index idx_messages_created_at on public.messages(created_at desc);
