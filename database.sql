CREATE TABLE "owner" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50)
);

CREATE TABLE "pet" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (50) NOT NULL,
	"breed" VARCHAR (50),
	"color" VARCHAR (25),
	"checked_in" BOOLEAN,
	"last_checkin" DATE,
	"owner_id" INT REFERENCES "owner"
);

CREATE TABLE "history" (
"id" SERIAL PRIMARY KEY,
"owner" VARCHAR (50) NOT NULL,
"pet" VARCHAR (50) NOT NULL,
"check_in" DATE,
"checkout" DATE
);
