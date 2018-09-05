
const express = require("express");
const pool = require("../modules/pool");
const {
  rejectUnauthenticated
} = require("../modules/authentication-middleware");
const router = express.Router();

router.get('/', rejectUnauthenticated,  (req, res)=> {
  const getAllLocalTrainersQuery = `SELECT local_trainers.*, local_trainers_requirements.*, national_trainer.first_name as national_trainer_first_name, national_trainer.last_name as national_trainer_last_name, cohort_requirements.*, cohort.*, state_level_organization.* FROM local_trainers
  JOIN local_trainers_requirements ON local_trainers.local_trainers_id = local_trainers_requirements.local_trainers_ref_id
  LEFT OUTER JOIN national_trainer ON local_trainers_requirements.national_trainer_ref_id = national_trainer.national_trainer_id
  JOIN cohort_requirements ON local_trainers_requirements.cohort_requirements_ref_id = cohort_requirements.cohort_req_id
  JOIN cohort ON cohort.cohort_id = local_trainers.cohort_ref_id
  JOIN state_level_organization ON state_level_organization.state_level_organization_id = cohort.state_level_organization_ref_id`

  pool.query(getAllLocalTrainersQuery)
  .then((results) => {
    console.log(results.rows);
    let resultAry = [];

    results.rows.forEach(element => {
      let indexOfLC = resultAry.findIndex(localTrainer => {
        return localTrainer.local_trainers_id == element.local_trainers_id
      })

      console.log(indexOfLC);
      
      if(indexOfLC === -1){
        let newLC = {
          local_trainers_id : element.local_trainers_id,
          first_name : element.first_name,
          last_name : element.last_name,
          cohort : {
            cohort_id: element.cohort_id,
            cohort_name: element.name
          },
          state : element.state,
          state_level_organization_id : element.state_level_organization_id,
          requirements : [
            {
              requirement_id : element.requirement_id,
              requirement_due_date : element.due_date,
              scheduled_date : element.scheduled_date,
              completed : element.completed,
              national_trainer_id : element.national_trainer_ref_id,
              national_trainer_first_name : element.national_trainer_first_name,
              national_trainer_last_name : element.national_trainer_last_name
            }
          ]
        }

        resultAry.push(newLC);
      }else{
        let newReq =  {
          requirement_id : element.requirement_id,
          requirement_due_date : element.due_date,
          scheduled_date : element.scheduled_date,
          completed : element.completed,
          national_trainer_id : element.national_trainer_ref_id,
          national_trainer_first_name : element.national_trainer_first_name,
          national_trainer_last_name : element.national_trainer_last_name
        }

        resultAry[indexOfLC].requirements.push(newReq);
      }

    })

    res.send(resultAry);
      

  }).catch((err) => {
      console.log(err);
      res.sendStatus(500);
  })

})

router.post('/addLT', (req, res) => {
    console.log('got to post', req.body);
    // if (req.isAuthenticated) {
        const queryText = `INSERT INTO "local_trainers" ("first_name", "last_name", "title", "email", "phone_number", "organization", "district", "cohort_ref_id") VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`
        pool.query(queryText, [req.body.first_name, req.body.last_name, req.body.title, req.body.email, req.body.phone_number, req.body.organization, req.body.district, req.body.cohort])
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

