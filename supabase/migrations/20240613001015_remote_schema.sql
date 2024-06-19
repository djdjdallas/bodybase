alter table "public"."clients" enable row level security;

alter table "public"."events" enable row level security;

alter table "public"."exercises" enable row level security;

alter table "public"."fitness_clients" enable row level security;

alter table "public"."hot_leads" enable row level security;

alter table "public"."main_owner" enable row level security;


alter table "public"."uploads" enable row level security;

alter table "public"."weekly_reports" enable row level security;

alter table "public"."workout_plans" enable row level security;

create policy "Enable insert for authenticated users only"
on "public"."clients"
as permissive
for insert
to authenticated
with check (true);



