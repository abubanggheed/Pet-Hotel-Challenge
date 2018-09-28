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

INSERT INTO "owner" ("name")
VALUES ('Chris'), ('Ally'), ('Dane');

INSERT INTO "pet" ("name", "breed", "color", "checked_in", "owner_id")
VALUES ('Charlie', 'Shih-tzu', 'Black', FALSE, 1), ('Thorin', 'Rabbit', 'White', FALSE, 1), ('Gatsby', 'Cat', 'White', FALSE, 2), ('Juniper', 'Cat', 'Tabby', FALSE, 3);
