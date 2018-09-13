-- These SQL commands should be run in order to initialize the tables needed for the project.

CREATE DATABASE "check_and_connect";

CREATE TABLE "national_trainer1" (
 "national_trainer_id" SERIAL PRIMARY KEY,
 "first_name" varchar(255) NOT NULL,
 "last_name" varchar(255) NOT NULL,
 "user_name" varchar(255) UNIQUE NOT NULL,
 "password" text NOT NULL,
 "email" varchar(255) NOT NULL,
 "title" varchar(255),
 "status" boolean DEFAULT true,
 "pw_reset_token" text DEFAULT NULL,
 "pw_reset_time" text DEFAULT NULL
);

CREATE TABLE "state_level_organization" (
 "state_level_organization_id" SERIAL PRIMARY KEY,
 "name" VARCHAR(255),
 "state" VARCHAR(255)
);

CREATE TABLE "state_lead" (
 "state_lead_id" SERIAL PRIMARY KEY,
 "first_name" varchar(255) NOT NULL,
 "last_name" varchar(255) NOT NULL,
 "email" varchar(255),
 "phone_number" varchar(255),
 "title" varchar(255),
 "state_level_organization_ref_id" INTEGER REFERENCES state_level_organization(state_level_organization_id),
 "state" varchar(255) NOT NULL
);

CREATE TABLE "requirements" (
 "requirements_id" SERIAL PRIMARY KEY,
 "name" varchar(255) UNIQUE NOT NULL,
 "description" text,
 "duration" integer NOT NULL,
 "notification_1_time" integer,
 "notification_2_time" integer
);

CREATE TABLE "cohort" (
 "cohort_id" SERIAL PRIMARY KEY,
 "name" varchar(255) NOT NULL,
 "start_date" date NOT NULL,
 "description" text,
 "state_level_organization_ref_id" INTEGER REFERENCES state_level_organization(state_level_organization_id)
);

CREATE TABLE "cohort_requirements" (
<<<<<<< HEAD
  "cohort_req_id" SERIAL PRIMARY KEY,
  "cohort_id" INTEGER REFERENCES cohort(cohort_id),
  "requirement_id" INTEGER REFERENCES requirements(requirements_id),
  "due_date" date NOT NULL,
  "notes" text,
  "notification_1_date" date,
  "notification_2_date" date
=======
 "cohort_req_id" SERIAL PRIMARY KEY,
 "cohort_id" INTEGER REFERENCES cohort(cohort_id),
 "requirement_id" INTEGER REFERENCES requirements(requirements_id),
 "due_date" date NOT NULL,
 "notes" text,
 "notification_1_date" date,
 "notification_2_date" date
>>>>>>> master
);

CREATE TABLE "local_trainers" (
 "local_trainers_id" SERIAL PRIMARY KEY,
 "first_name" varchar(255) NOT NULL,
 "last_name" varchar(255) NOT NULL,
 "title" varchar(255),
 "email" varchar(255),
 "phone_number" varchar(255),
 "organization" varchar(255),
 "district" varchar(255),
 "cohort_ref_id" INTEGER REFERENCES cohort(cohort_id),
 "status" boolean DEFAULT true,
 "notes" text
);

CREATE TABLE "local_trainers_requirements" (
 "local_trainers_requirements_id" SERIAL PRIMARY KEY,
 "local_trainers_ref_id" INTEGER REFERENCES local_trainers(local_trainers_id),
 "cohort_requirements_ref_id" INTEGER REFERENCES cohort_requirements(cohort_req_id),
 "national_trainer_ref_id" INTEGER REFERENCES national_trainer(national_trainer_id),
 "completed" date,
 "notes" text,
 "scheduled_date" date,
 "notification_1_sent" boolean DEFAULT false,
 "notification_2_sent" boolean DEFAULT false
);

CREATE TABLE "national_trainer_notification" (
 "national_trainer_notification_id" SERIAL PRIMARY KEY,
 "national_trainer_id" INTEGER REFERENCES national_trainer(national_trainer_id),
 "local_trainers_requirements" INTEGER REFERENCES local_trainers_requirements(local_trainers_requirements_id),
 "notification_1_sent" boolean DEFAULT false,
 "notification_2_sent" boolean DEFAULT false
);
