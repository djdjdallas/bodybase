alter table "public"."main_clients" drop column "name";

alter table "public"."main_clients" add column "first_name" text not null;

alter table "public"."main_clients" add column "last_name" text not null;


