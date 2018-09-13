--Dummy data
INSERT INTO "state_level_organization" ("name", "state")
VALUES ('Dummy Department of Education', 'AK'),('C&C University', 'HI');

INSERT INTO "state_lead" ("first_name", "last_name", "email", "phone_number", "title", "state_level_organization_ref_id", "state")
VALUES ('Michael', 'Clayton', 'mclayton@gmail.com', '612-555-1234', 'Director of Snacks', 1, 'AK'),
	   ('Mary', 'Poppins', 'poppins@aol.com', '123-456-7890', 'Nanny Supreme', 2, 'HI');

--Semi-dummy data
INSERT INTO "requirements" ("name", "description", "duration", "notification_1_time", "notification_2_time")
VALUES ('TTT Workshop', 'This is the intial Train The Trainers workshop that kicks off the 24-month cycle', 0, null, null),
	   ('Sign TTT Terms Agreement', 'All trainers need to submit a signed agreement form', 10, 1, null),
	   ('Observed Training', 'Local trainers to need conduct a training that is observed by one of the national trainers', 335, 275, 305),
	   ('Certification', 'This is the official certification date', 730, 670, 700);

INSERT INTO "cohort" ("name", "state", "start_date", "description", "state_level_organization_ref_id")
VALUES ('cohort 1', 'AK', NOW(), '', 1),('cohort 2', 'AK', NOW(), '', 1),('cohort 1', 'HI', NOW(), '', 2);

