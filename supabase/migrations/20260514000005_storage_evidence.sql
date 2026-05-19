-- Evidence bucket for remote-activity screenshots.
-- Private bucket; users upload to their own folder, admins read all via signed URLs.
insert into storage.buckets (id, name, public)
values ('evidence', 'evidence', false)
on conflict (id) do nothing;

create policy "Users upload own evidence"
  on storage.objects for insert
  with check (
    bucket_id = 'evidence'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users read own evidence"
  on storage.objects for select
  using (
    bucket_id = 'evidence'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Admins read all evidence"
  on storage.objects for select
  using (
    bucket_id = 'evidence'
    and exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );
