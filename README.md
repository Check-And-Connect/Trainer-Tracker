# Check and Connect: Trainer Tracker

Trainer Tracker is a full-stack web application that is used by the Check and Connect program to track local trainers in 9 states. National trainers are able to monitor the completion status of certifications, training sessions, and workshops for every local trainer.

## Live on Heroku:
check-and-connect.herokuapp.com

## Built With:
Node.js
Express
React
React-Redux
Redux-Sagas
PostgreSQL
NodeMailer
Node-Cron
Heroku

## Getting Started:
Required:

Node.js
PostgreSQL
Nodemon

To start with a sample table: 

Create a new database in PostgreSQL named check_and_connect.
The database.sql file contains the SQL commands that will set up the starting tables in the database.
In order to set up login information, insert this dummy data or your own data into the national_trainer table. You will need to replace the email address with a real email address that you have access to.

INSERT INTO "public"."national_trainer"("national_trainer_id","first_name","last_name","user_name","password","email","title","status","pw_reset_token","pw_reset_time")
VALUES
(1,'Tyler','Smith','TSmith','password','youremail@gmail.com',NULL,TRUE,NULL,NULL);

Since the password isn't hashed, when you get to the login page you will need to click on forgot password first. It will ask you for your email address and then send you an email so that you can reset your password. After that is completed, then you will be able to log into your account.

To run a development build on your own machine:

1. Clone/download Repository

2. npm install

3. Create a .env file with the following variable:
SERVER_SESSION_SECRET=

Add a string of random numbers after the SERVER_SESSION_SECRET=.

4. npm run server

5. npm run client

## Features:
Search trainers page allows the user to filter and search for specific local trainers.
Cohort manager page has a filter for specific cohorts that can be managed at the same time.
Both the search trainers and cohort manager pages have an excel export feature that will create an excel file with all of the local trainers currently in the table.
Pages exist that allow the user to add national trainers, cohorts, local trainers, and state level organizations.
Account details page contains the current user's information which can be updated.

Hand-crafted by: Nate Carroll, Grace Kasahara, Isaac Negatu, and Ross Qualey