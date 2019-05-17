CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar UNIQUE,
  "password" varchar,
  "full_name" varchar,
  "email" varchar UNIQUE,
  "gender" varchar,
  "date_of_birth" varchar,
  "created_at" varchar
  "profilepic" varchar
);

CREATE TABLE "category" (
  "id" serial PRIMARY KEY,
  "category_name" varchar
);

CREATE TABLE "users_community" (
  "id" serial PRIMARY KEY,
  "users_id" int,
  "communities_id" int,
  "admin" boolean
);

CREATE TABLE "community" (
  "id" serial PRIMARY KEY,
  "community_name" varchar UNIQUE,
  "category_id" int
);

CREATE TABLE "post" (
  "id" serial UNIQUE,
  "user_id" int,
  "content" varchar,
  "comment_box" serial PRIMARY KEY,
  "community_id" int,
  "category_id" int,
  "personal" boolean,
  "txt" boolean,
  "photo" boolean
);

CREATE TABLE "comment" (
  "id" serial UNIQUE,
  "user_id" int,
  "comment_content" varchar,
  "comment_box_id" int,
  "txt" boolean,
  "photo" boolean
);

ALTER TABLE "users_community" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");

ALTER TABLE "users_community" ADD FOREIGN KEY ("communities_id") REFERENCES "community" ("id");

ALTER TABLE "community" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "post" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "post" ADD FOREIGN KEY ("community_id") REFERENCES "community" ("id");

ALTER TABLE "post" ADD FOREIGN KEY ("category_id") REFERENCES "category" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("comment_box_id") REFERENCES "post" ("comment_box");