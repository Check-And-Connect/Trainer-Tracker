const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/stateLevelOrganization', (req, res) => {
    if (req.isAuthenticated) {
        const queryText = `SELECT "state", "name", "state_level_organization_id" FROM state_level_organization;`;
        pool.query(queryText)
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/states', (req, res) => {
    if (req.isAuthenticated) {
        const queryText = `SELECT "state" FROM state_level_organization;`;
        pool.query(queryText)
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/cohort', (req, res) => {
    if (req.isAuthenticated) {
        const queryText = `SELECT "name", "cohort_id", "state_level_organization_ref_id" FROM cohort;`;
        pool.query(queryText)
            .then((results) => {
                res.send(results.rows)
                console.log(results.rows);

            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});

router.get('/requirements', (req, res) => {
    const queryText =  'SELECT * FROM requirements ORDER BY requirements_id';
    pool.query(queryText)
        .then(results => {
            console.log(results.rows);
            res.send(results.rows);
        })
        .catch(err => {
            console.log(err);
            
            res.sendStatus(500);
            
        })
})


router.post('/addNewCohort', (req, res) => {
    const createCohortQuery = 'INSERT INTO cohort (name, start_date , description, state_level_organization_ref_id) VALUES ($1, $2, $3, $4) RETURNING cohort_id';

    const addtoCohortRequirementQuery = 'INSERT INTO cohort_requirements (cohort_id, requirement_id, due_date, notification_1_date, notification_2_date) VALUES ($1, $2, $3, $4 , $5 )';

    pool.query(createCohortQuery, [req.body.newCohort.name, req.body.chosenDate, req.body.newCohort.note, req.body.newCohort.state_level_organization])
        .then(result => {
            let cohortId = result.rows[0].cohort_id;
            let reqCounter = req.body.newCohort.requirements.length;
            
            
            req.body.newCohort.requirements.forEach(requirement => {

                pool.query(addtoCohortRequirementQuery, [cohortId, requirement.requirement_id, requirement.due_date, requirement.notification_1_date, requirement.notification_2_date])
                .then(result1 => {
                    console.log(requirement.requirement_name + ' ' + 'added');
                    reqCounter--;
                    console.log(reqCounter);
                    
                    if(reqCounter === 0){
                        res.sendStatus(201);
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                })
            });

        }).catch(err => {
            console.log(err);
            res.sendStatus(500);  
        })
})

router.post('/addNewSLO', (req, res) => {
    let queryText = 'INSERT INTO state_level_organization (name, state) VALUES ($1, $2)'

    pool.query(queryText, [req.body.name, req.body.state])
        .then(response => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        })
})

router.get('/latestCohort/:state_level_org_id', (req, res) => {
    let queryText = 'SELECT * FROM cohort WHERE state_level_organization_ref_id = $1 ORDER BY cohort_id DESC LIMIT 1';

    pool.query(queryText, [req.params.state_level_org_id])
        .then(response => {
            // console.log(response.rows);
            res.send(response.rows);
            
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
            
        })
})

router.get('/cohortById/:cohort_id' , (req, res) => {
    console.log(req.params);
    let queryText = `SELECT *, cohort.name as cohort_name, cohort.description as c_desc, requirements.name as req_name FROM cohort
    JOIN cohort_requirements ON cohort_requirements.cohort_id = cohort.cohort_id
    JOIN requirements ON requirements.requirements_id = cohort_requirements.requirement_id
    JOIN state_level_organization ON state_level_organization.state_level_organization_id = cohort.state_level_organization_ref_id
    WHERE cohort.cohort_id = $1`
    
    pool.query(queryText , [req.params.cohort_id] )
        .then(response => {
            console.log(response.rows);
            let responseObj = {
                cohort_id : response.rows[0].cohort_id,
                cohort_name : response.rows[0].cohort_name,
                start_date : response.rows[0].start_date,
                note  : response.rows[0].c_desc,
                state_level_org_id : response.rows[0].state_level_organization_id,
                state : response.rows[0].state,
                requirements : [] 
            };

            response.rows.forEach(row => {
                responseObj.requirements.push({
                    requirement_id : row.requirement_id,
                    requirement_name : row.req_name, 
                    due_date : row.due_date,
                    notification_1_date : row.notification_1_date,
                    notification_2_date : row.notification_2_date
                })
            })

            res.send(responseObj);

        })
        .catch(err => {
            console.log(err);

            res.sendStatus(500);
        })
    
})

router.put('/updateById/:cohort_id', (req, res) => {
    // console.log('============================');
    // console.log(req.params);
    // console.log(req.body);
    // console.log('============================');

    let updateCohortQuery = 'UPDATE cohort SET name = $1, description = $2, state_level_organization_ref_id = $3 WHERE cohort_id = $4';

    let updateCohortRequirements = 'UPDATE cohort_requirements SET due_date = $1, notification_1_date = $2, notification_2_date = $3 WHERE cohort_id = $4 AND requirement_id = $5';

    let reqCounter = req.body.requirements.length;
    pool.query(updateCohortQuery, [req.body.name, req.body.note, req.body.state_level_organization, req.params.cohort_id  ])
        .then(response => {
            
            req.body.requirements.forEach(requirement => {
                pool.query(updateCohortRequirements, [requirement.due_date, requirement.notification_1_date, requirement.notification_2_date, req.params.cohort_id, requirement.requirement_id])
                .then(result => {
                    console.log(requirement + ' updated');
                    
                    reqCounter--;
                    
                    if(reqCounter === 0){
                        res.sendStatus(201);
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(500);
                })
            })
        }).catch(err => {
            console.log(err);
            res.sendStatus(500);  
        })
})

module.exports = router;