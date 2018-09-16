const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get("/", rejectUnauthenticated, (req, res) => {
  const getAllLocalTrainersQuery = `SELECT local_trainers.*, local_trainers_requirements.*, local_trainers_requirements.notes as requirement_notes, national_trainer.first_name as national_trainer_first_name, national_trainer.last_name as national_trainer_last_name, cohort_requirements.*, requirements.name as requirement_name ,cohort.*, state_level_organization.name as slo_name, state_level_organization.state_level_organization_id as state_level_organization_id, state_level_organization.state as state FROM local_trainers
  JOIN local_trainers_requirements ON local_trainers.local_trainers_id = local_trainers_requirements.local_trainers_ref_id
  LEFT OUTER JOIN national_trainer ON local_trainers_requirements.national_trainer_ref_id = national_trainer.national_trainer_id
  JOIN cohort_requirements ON local_trainers_requirements.cohort_requirements_ref_id = cohort_requirements.cohort_req_id
  JOIN requirements ON requirements.requirements_id = cohort_requirements.requirement_id
  JOIN cohort ON cohort.cohort_id = local_trainers.cohort_ref_id
  JOIN state_level_organization ON state_level_organization.state_level_organization_id = cohort.state_level_organization_ref_id`;

  console.log(req.user);

  const queryForPerson =
    getAllLocalTrainersQuery +
    ` WHERE local_trainers.local_trainers_id = $1 AND cohort_requirements.requirement_id = $2
    ORDER BY cohort_requirements.requirement_id`;
    // added order by

  let poolQuery = () => {
    if (req.query.hasOwnProperty("requirementId")) {
      return new Promise((resolve, reject) => {
        pool
          .query(queryForPerson, [
            req.query.localTrainerId,
            req.query.requirementId
          ])
          .then(response => {
            console.log('=====================================');

            console.log(response.rows);
            console.log('=====================================');
            resolve(response);
          })
          .catch(err => {
            console.log(err);

            reject();
            res.sendStatus(500);
          });
      });
    } else {
      return new Promise((resolve, reject) => {
        pool
          .query(getAllLocalTrainersQuery)
          .then(response => {
            resolve(response);
          })
          .catch(err => {
            console.log(err);

            reject();
            res.sendStatus(500);
          });
      });
    }
  };

  poolQuery()
    .then(results => {


      let resultAry = [];
      console.log('POOL QUERY RESULTS.ROWS:');
      console.log(results.rows);
      results.rows.forEach(element => {
        let indexOfLC = resultAry.findIndex(localTrainer => {
          return localTrainer.local_trainers_id == element.local_trainers_id;
        });

        if (indexOfLC === -1) {
          let newLC = {
            local_trainers_id: element.local_trainers_id,
            first_name: element.first_name,
            last_name: element.last_name,
            status: element.status,
            cohort: {
              cohort_id: element.cohort_id,
              cohort_name: element.name
            },
            state: element.state,
            state_level_organization: {
              state_level_organization_id: element.state_level_organization_id,
              state_level_organization_name: element.slo_name
            },
            requirements: [
              {
                requirement_id: element.requirement_id,
                requirement_name: element.requirement_name,
                requirement_due_date: element.due_date,
                scheduled_date: element.scheduled_date,
                completed: element.completed,
                national_trainer_id: element.national_trainer_ref_id,
                national_trainer_first_name:
                  element.national_trainer_first_name,
                national_trainer_last_name: element.national_trainer_last_name,
                requirement_note: element.requirement_notes
              }
            ]
          };

          resultAry.push(newLC);
        } else {
          let newReq = {
            requirement_id: element.requirement_id,
            requirement_name: element.requirement_name,
            requirement_due_date: element.due_date,
            scheduled_date: element.scheduled_date,
            completed: element.completed,
            national_trainer_id: element.national_trainer_ref_id,
            national_trainer_first_name: element.national_trainer_first_name,
            national_trainer_last_name: element.national_trainer_last_name
          };

          resultAry[indexOfLC].requirements.push(newReq);
        }
      });
      res.send(resultAry);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//gets state and state level org
router.get("/stateLevelOrganization", (req, res) => {
  if (req.isAuthenticated) {
    const queryText = `SELECT "state", "name", "id" FROM state_level_organization;`;
    pool
      .query(queryText)
      .then(results => {
        res.send(results.rows);
        console.log(results.rows);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

//Adds a new local trainer to the local trainer table and the local trainers requirements table
router.post("/addLT", async (req, res) => {
  console.log("got to post", req.body);
  if (req.isAuthenticated) {
    const postQuery = `INSERT INTO "local_trainers" (
                        "first_name", 
                        "last_name", 
                        "title", 
                        "email", 
                        "phone_number", 
                        "organization", 
                        "district", 
                        "cohort_ref_id") 
                        VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`;
    await pool
      .query(postQuery, [
        req.body.first_name,
        req.body.last_name,
        req.body.title,
        req.body.email,
        req.body.phone_number,
        req.body.organization,
        req.body.district,
        req.body.cohort
      ])
      .then(results => {
        // res.sendStatus(200);
        console.log('post', results.command)
        return results.command || null;
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });

    let localTrainerID = null;
    console.log('trainerID');
    const getTrainerID = `SELECT "local_trainers_id" FROM local_trainers WHERE
                              "first_name" = $1 AND 
                              "last_name" = $2 AND  
                              "title" = $3 AND 
                              "email" = $4 AND  
                              "phone_number" = $5 AND   
                              "organization" = $6 AND  
                              "district" = $7 AND  
                              "cohort_ref_id" = $8;`;
    await pool
      .query(getTrainerID, [
        req.body.first_name,
        req.body.last_name,
        req.body.title,
        req.body.email,
        req.body.phone_number,
        req.body.organization,
        req.body.district,
        req.body.cohort
      ])
      .then(results => {
        localTrainerID = results.rows[0].local_trainers_id;
        console.log('localTrainer', localTrainerID);
        return results.rows[0] || null;
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });

    let cohortRequirementsID = [];
    const getcohortRequirementsID =
      `SELECT "cohort_req_id" FROM cohort_requirements WHERE "cohort_id" = $1;`;
    await pool
      .query(getcohortRequirementsID, [
        req.body.cohort
      ])
      .then(results => {
        cohortRequirementsID = results.rows;
        for (let i = 0; i < cohortRequirementsID.length; i++) {
          const cohortReqID = cohortRequirementsID[i].cohort_req_id;
          const postLTRequirements = `INSERT INTO "local_trainers_requirements" (
                "local_trainers_ref_id", 
                "cohort_requirements_ref_id") 
                VALUES ($1,$2);`;
          pool.query(postLTRequirements, [
            localTrainerID,
            cohortReqID
          ])
            .then(results => {
              return results.command || null;
            })
            .catch(error => {
              console.log(error);
              res.sendStatus(500);
            });
        }
        res.sendStatus(200);
      })
      .catch(error => {
        console.log(error);
        res.sendStatus(500);
      });
  } else {
    res.sendStatus(403);
  }
});

router.post("/markRequirememtComplete/:local_trainer_id", (req, res) => {
  let getLocalTrainerRequirementIdQuery = `SELECT local_trainers_requirements.local_trainers_requirements_id FROM local_trainers_requirements JOIN cohort_requirements ON cohort_requirements.cohort_req_id = local_trainers_requirements.cohort_requirements_ref_id
  JOIN cohort ON cohort_requirements.cohort_id = cohort.cohort_id
  WHERE local_trainers_requirements.local_trainers_ref_id = $1 AND cohort_requirements.requirement_id = $2;`;

  console.log(req.body);

  let markCompleteQuery =
    "UPDATE local_trainers_requirements SET completed = $1 , national_trainer_ref_id = $2 , notes = $3 WHERE local_trainers_requirements_id = $4";
  pool
    .query(getLocalTrainerRequirementIdQuery, [
      req.params.local_trainer_id,
      req.body.requirement_id
    ])
    .then(response => {
      console.log(response.rows);
      pool
        .query(markCompleteQuery, [
          req.body.date_marked_complete,
          req.body.national_trainer ? req.body.national_trainer : req.user.national_trainer_id,
          req.body.note ? req.body.note : null,
          response.rows[0].local_trainers_requirements_id
        ])
        .then(() => {
          res.sendStatus(201);
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

router.post("/scheduleForRequirement/:local_trainer_id", (req, res) => {
  let getLocalTrainerRequirementIdQuery = `SELECT local_trainers_requirements.local_trainers_requirements_id FROM local_trainers_requirements JOIN cohort_requirements ON cohort_requirements.cohort_req_id = local_trainers_requirements.cohort_requirements_ref_id
  JOIN cohort ON cohort_requirements.cohort_id = cohort.cohort_id
  WHERE local_trainers_requirements.local_trainers_ref_id = $1 AND cohort_requirements.requirement_id = $2;`;

  console.log(req.body);

  let markCompleteQuery =
    "UPDATE local_trainers_requirements SET scheduled_date = $1 , national_trainer_ref_id = $2 WHERE local_trainers_requirements_id = $3";
  pool
    .query(getLocalTrainerRequirementIdQuery, [
      req.params.local_trainer_id,
      req.body.requirement_id
    ])
    .then(response => {
      console.log(response.rows);
      pool
        .query(markCompleteQuery, [
          req.body.date_scheduled,
          req.body.national_trainer ? req.body.national_trainer : req.user.national_trainer_id,
          response.rows[0].local_trainers_requirements_id
        ])
        .then(() => {
          res.sendStatus(201);
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

// THIS IS THE ROUTE FOR EDITING THE LOCAL TRAINER DETAILS
// i.e. FROM THE TRAINER DETAILS VIEW
router.put("/:id", rejectUnauthenticated, (req, res) => {
  console.log("local_trainer PUT route for", req.params.id);
  console.log(req.body);
  const editLocalTrainerDetailsQuery = `UPDATE local_trainers SET first_name = $1, last_name = $2, title = $3, email = $4, phone_number = $5, organization = $6, district = $7, notes = $8, cohort_ref_id = $9
                                        WHERE local_trainers_id = $10`;
  pool
    .query(editLocalTrainerDetailsQuery, [
      req.body.first_name,
      req.body.last_name,
      req.body.title,
      req.body.email,
      req.body.phone_number,
      req.body.organization,
      req.body.district,
      req.body.notes,
      req.body.cohort_ref_id,
      req.params.id
    ])
    .then(PGres => {
      console.log(PGres);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// THIS IS THE ROUTE TO GET ALL OF THE DETAILS FOR A SINGLE LOCAL TRAINER
router.get("/:id", rejectUnauthenticated, async (req, res) => {
  console.log("local_trainer GET details route", req.params.id);
  let err = false;
  let cohortID = null;
  let sloID = null;

  const getLocalTrainerDetailsQuery = `SELECT * FROM local_trainers WHERE local_trainers_id = $1;`;
  const localTrainerObject = await pool
    .query(getLocalTrainerDetailsQuery, [req.params.id])
    .then(PGres => {
      cohortID = PGres.rows[0].cohort_ref_id || null;
      return PGres.rows[0] || null;
    })
    .catch(err => {
      console.log(err);
      err = true;
    });

  const getTrainerRequirementsQuery = `SELECT * FROM local_trainers_requirements
  JOIN cohort_requirements ON local_trainers_requirements.cohort_requirements_ref_id = cohort_requirements.cohort_req_id
  JOIN requirements ON requirements.requirements_id = cohort_requirements.requirement_id
  WHERE local_trainers_ref_id = $1;`;
  const trainerRequirementsArray = await pool
    .query(getTrainerRequirementsQuery, [req.params.id])
    .then(PGres => {
      return PGres.rows || null;
    })
    .catch(err => {
      console.log(err);
      err = true;
    });

  const getTrainerCohortQuery = `SELECT * FROM cohort WHERE cohort_id = $1;`;
  const trainerCohortObject = await pool
    .query(getTrainerCohortQuery, [cohortID])
    .then(PGres => {
      sloID = PGres.rows[0].state_level_organization_ref_id || null;
      return PGres.rows[0] || null;
    })
    .catch(err => {
      console.log(err);
      err = true;
    });

  const getSloDetailsQuery = `SELECT * FROM state_level_organization WHERE state_level_organization_id =$1;`;
  const sloDetailsObject = await pool
    .query(getSloDetailsQuery, [sloID])
    .then(PGres => {
      return PGres.rows[0] || null
    })
    .catch(err => {
      console.log(err);
      err = true;
    })

  if (err) {
    res.sendStatus(500);
  } else {
    res.send({
      trainer: localTrainerObject,
      requirements: trainerRequirementsArray,
      cohort: trainerCohortObject,
      slo: sloDetailsObject
    });
  }
});

// THIS ROUTE TOGGLES LOCAL TRAINER STATUS AND THAT'S ALL IT DOES
router.put("/status/:id", (req, res) => {
  console.log('toggle route reached');
  const toggleTrainerQuery = `UPDATE local_trainers SET status = NOT status WHERE local_trainers_id = $1;`;
  pool.query(toggleTrainerQuery, [req.params.id])
    .then(PGres => {
      res.sendStatus(200)
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    })
})

module.exports = router;
