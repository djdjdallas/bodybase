alter table "public"."main_clients" enable row level security;

alter table "public"."new_clients" enable row level security;

create policy "Delete own records"
on "public"."main_clients"
as permissive
for delete
to public
using ((user_id = auth.uid()));


create policy "Insert own records"
on "public"."main_clients"
as permissive
for insert
to public
with check ((user_id = auth.uid()));


create policy "Select own records"
on "public"."main_clients"
as permissive
for select
to public
using ((user_id = auth.uid()));


create policy "Update own records"
on "public"."main_clients"
as permissive
for update
to public
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



