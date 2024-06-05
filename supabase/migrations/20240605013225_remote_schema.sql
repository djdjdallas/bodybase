drop policy "Authenticated users can upload files" on "storage"."objects";

drop policy "Users can delete their own files" on "storage"."objects";

drop policy "Users can update their own files" on "storage"."objects";

drop policy "Users can view their own files" on "storage"."objects";

create policy "Enable read access for all users"
on "storage"."buckets"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "storage"."objects"
as permissive
for insert
to public
with check (true);


create policy "Enable read access for all users"
on "storage"."objects"
as permissive
for select
to public
using (true);


create policy "Give anon users access to JPG images in folder 1va6avm_0"
on "storage"."objects"
as permissive
for select
to public
using (((bucket_id = 'uploads'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));


create policy "Give anon users access to JPG images in folder 1va6avm_1"
on "storage"."objects"
as permissive
for insert
to public
with check (((bucket_id = 'uploads'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));


create policy "Give anon users access to JPG images in folder 1va6avm_2"
on "storage"."objects"
as permissive
for update
to public
using (((bucket_id = 'uploads'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));


create policy "Give anon users access to JPG images in folder 1va6avm_3"
on "storage"."objects"
as permissive
for delete
to public
using (((bucket_id = 'uploads'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));


create policy "Authenticated users can upload files"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (((bucket_id = 'client_files'::text) AND (owner = auth.uid()) AND (private.uuid_or_null(path_tokens[1]) IS NOT NULL)));


create policy "Users can delete their own files"
on "storage"."objects"
as permissive
for delete
to authenticated
using (((bucket_id = 'client_files'::text) AND (owner = auth.uid())));


create policy "Users can update their own files"
on "storage"."objects"
as permissive
for update
to authenticated
with check (((bucket_id = 'client_files'::text) AND (owner = auth.uid())));


create policy "Users can view their own files"
on "storage"."objects"
as permissive
for select
to authenticated
using (((bucket_id = 'client_files'::text) AND (owner = auth.uid())));



