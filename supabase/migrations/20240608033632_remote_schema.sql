create sequence "public"."exercises_id_seq";

create sequence "public"."workout_plans_id_seq";

create table "public"."exercises" (
    "id" integer not null default nextval('exercises_id_seq'::regclass),
    "workout_plan_id" integer not null,
    "name" character varying(255) not null,
    "reps" integer not null,
    "sets" integer not null,
    "weight" numeric(5,2)
);


create table "public"."workout_plans" (
    "id" integer not null default nextval('workout_plans_id_seq'::regclass),
    "name" character varying(255) not null,
    "date" date not null,
    "duration" integer not null,
    "notes" text,
    "created_at" timestamp without time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp without time zone default CURRENT_TIMESTAMP
);


alter sequence "public"."exercises_id_seq" owned by "public"."exercises"."id";

alter sequence "public"."workout_plans_id_seq" owned by "public"."workout_plans"."id";

CREATE UNIQUE INDEX exercises_pkey ON public.exercises USING btree (id);

CREATE UNIQUE INDEX workout_plans_pkey ON public.workout_plans USING btree (id);

alter table "public"."exercises" add constraint "exercises_pkey" PRIMARY KEY using index "exercises_pkey";

alter table "public"."workout_plans" add constraint "workout_plans_pkey" PRIMARY KEY using index "workout_plans_pkey";

alter table "public"."exercises" add constraint "exercises_workout_plan_id_fkey" FOREIGN KEY (workout_plan_id) REFERENCES workout_plans(id) ON DELETE CASCADE not valid;

alter table "public"."exercises" validate constraint "exercises_workout_plan_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$
;

grant delete on table "public"."exercises" to "anon";

grant insert on table "public"."exercises" to "anon";

grant references on table "public"."exercises" to "anon";

grant select on table "public"."exercises" to "anon";

grant trigger on table "public"."exercises" to "anon";

grant truncate on table "public"."exercises" to "anon";

grant update on table "public"."exercises" to "anon";

grant delete on table "public"."exercises" to "authenticated";

grant insert on table "public"."exercises" to "authenticated";

grant references on table "public"."exercises" to "authenticated";

grant select on table "public"."exercises" to "authenticated";

grant trigger on table "public"."exercises" to "authenticated";

grant truncate on table "public"."exercises" to "authenticated";

grant update on table "public"."exercises" to "authenticated";

grant delete on table "public"."exercises" to "service_role";

grant insert on table "public"."exercises" to "service_role";

grant references on table "public"."exercises" to "service_role";

grant select on table "public"."exercises" to "service_role";

grant trigger on table "public"."exercises" to "service_role";

grant truncate on table "public"."exercises" to "service_role";

grant update on table "public"."exercises" to "service_role";

grant delete on table "public"."workout_plans" to "anon";

grant insert on table "public"."workout_plans" to "anon";

grant references on table "public"."workout_plans" to "anon";

grant select on table "public"."workout_plans" to "anon";

grant trigger on table "public"."workout_plans" to "anon";

grant truncate on table "public"."workout_plans" to "anon";

grant update on table "public"."workout_plans" to "anon";

grant delete on table "public"."workout_plans" to "authenticated";

grant insert on table "public"."workout_plans" to "authenticated";

grant references on table "public"."workout_plans" to "authenticated";

grant select on table "public"."workout_plans" to "authenticated";

grant trigger on table "public"."workout_plans" to "authenticated";

grant truncate on table "public"."workout_plans" to "authenticated";

grant update on table "public"."workout_plans" to "authenticated";

grant delete on table "public"."workout_plans" to "service_role";

grant insert on table "public"."workout_plans" to "service_role";

grant references on table "public"."workout_plans" to "service_role";

grant select on table "public"."workout_plans" to "service_role";

grant trigger on table "public"."workout_plans" to "service_role";

grant truncate on table "public"."workout_plans" to "service_role";

grant update on table "public"."workout_plans" to "service_role";

CREATE TRIGGER update_workout_plans_updated_at BEFORE UPDATE ON public.workout_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


