revoke delete on table "public"."new_clients" from "anon";

revoke insert on table "public"."new_clients" from "anon";

revoke references on table "public"."new_clients" from "anon";

revoke select on table "public"."new_clients" from "anon";

revoke trigger on table "public"."new_clients" from "anon";

revoke truncate on table "public"."new_clients" from "anon";

revoke update on table "public"."new_clients" from "anon";

revoke delete on table "public"."new_clients" from "authenticated";

revoke insert on table "public"."new_clients" from "authenticated";

revoke references on table "public"."new_clients" from "authenticated";

revoke select on table "public"."new_clients" from "authenticated";

revoke trigger on table "public"."new_clients" from "authenticated";

revoke truncate on table "public"."new_clients" from "authenticated";

revoke update on table "public"."new_clients" from "authenticated";

revoke delete on table "public"."new_clients" from "service_role";

revoke insert on table "public"."new_clients" from "service_role";

revoke references on table "public"."new_clients" from "service_role";

revoke select on table "public"."new_clients" from "service_role";

revoke trigger on table "public"."new_clients" from "service_role";

revoke truncate on table "public"."new_clients" from "service_role";

revoke update on table "public"."new_clients" from "service_role";

alter table "public"."new_clients" drop constraint "new_clients_status_check";

alter table "public"."new_clients" drop constraint "new_clients_total_sales_check";

alter table "public"."new_clients" drop constraint "new_clients_pkey";

drop index if exists "public"."new_clients_pkey";

drop table "public"."new_clients";


