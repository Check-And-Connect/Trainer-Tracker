
const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");
const router = express.Router();

/**
 * This end point will return all local trainers and their requirements
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  /**
   * This query will retrieve the info about the local trainer, the cohort and the cohort requirements ( mainly for the due dates).
   * Also, this query will get the state level organization associated with each person
   */
  let firstQuery =
    "SELECT * FROM local_trainers JOIN cohort ON local_trainers.cohort_ref_id = cohort.cohort_id JOIN cohort_requirements ON cohort.cohort_id = cohort_requirements.cohort_id JOIN state_level_organization ON cohort.state_level_organization_ref_id = state_level_organization.state_level_organization_id";

  /**
   * This query will retrieve requirements for each local trainer in where we'll be able to see if a task is completed or not.
   * Also, this query will get the national trainers who observed each task or held an event ...
   */
  let secondQuery =
    "SELECT local_trainers_requirements.*, national_trainer.first_name, national_trainer.last_name FROM local_trainers_requirements LEFT OUTER JOIN national_trainer ON local_trainers_requirements.national_trainer_ref_id = national_trainer.national_trainer_id;";

  pool
    .query(firstQuery)
    .then(response => {
      let responseAry = [];

      pool
        .query(secondQuery)
        .then(second_response => {
          console.log(second_response.rows[0]);

          response.rows.forEach(element => {
            let indexOfLC = responseAry.findIndex(local_trainer => {
              return (
                local_trainer.local_trainers_id == element.local_trainers_id
              );
            });
            console.log(indexOfLC);

            if (indexOfLC === -1) {
              let newLC = {
                local_trainers_id: element.local_trainers_id,
                first_name: element.first_name,
                last_name: element.last_name,
                cohort: {
                  cohort_id: element.cohort_id,
                  cohort_name: element.name
                },
                state: element.state,
                state_level_organization_id:
                  element.state_level_organization_id,
                requirements: [
                  {
                    requirement_id: element.requirement_id,
                    requirement_due_date: element.due_date
                  }
                ]
              };

              responseAry.push(newLC);
            } else {

              let newReq = {
                requirement_id: element.requirement_id,
                requirement_due_date: element.due_date
              };
              responseAry[indexOfLC].requirements.push(newReq);
            }
          });

          second_response.rows.forEach(element => {
            let indexOfLC = responseAry.findIndex(local_trainer => {
              return (
                local_trainer.local_trainers_id == element.local_trainers_ref_id
              );
            });

            let indexOfReq = responseAry[indexOfLC].requirements.findIndex(
              requirement => {
                return requirement.requirement_id == element.requirements_ref_id;
              }
            );

            responseAry[indexOfLC].requirements[indexOfReq] = {
              ...responseAry[indexOfLC].requirements[indexOfReq],
              scheduled_date: element.scheduled_date,
              completed: element.completed,
              national_trainer_id: element.national_trainer_ref_id,
              national_trainer_first_name: element.first_name,
              national_trainer_last_nale: element.last_name
            };
          });

          res.send(responseAry);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});


router.get('/stateLevelOrganization', (req, res) => {
    // if (req.isAuthenticated) {
        const queryText = `SELECT "state", "name", "id" FROM state_level_organization;`;
        pool.query(queryText)
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    // } else {
    //     res.sendStatus(403);
    // }
});

router.get('/stateLead', (req, res) => {
    // if (req.isAuthenticated) {
        const queryText = `SELECT "first_name", "last_name", "id" FROM state_lead;`;
        pool.query(queryText)
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    // } else {
    //     res.sendStatus(403);
    // }
});

router.get('/cohort', (req, res) => {
    // if (req.isAuthenticated) {
        const queryText = `SELECT "name", "id" FROM cohort;`;
        pool.query(queryText)
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    // } else {
    //     res.sendStatus(403);
    // }
});

router.post('/addLT', (req, res) => {
    console.log('got to post', req.body);
    // if (req.isAuthenticated) {
        const queryText = `INSERT INTO "local_trainers" ("first_name", "last_name", "title", "email", "phone_number", "organization", "district", "cohort_ref_id") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`
        pool.query(queryText, [req.body.first_name, req.body.last_name, req.user.id])
            .then(() => {
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log(error);
                res.sendStatus(500)
            })
    // } else {
    //     res.sendStatus(403);
    // }
})

module.exports = router;

