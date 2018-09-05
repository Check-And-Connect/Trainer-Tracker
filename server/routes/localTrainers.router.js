const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/stateLevelOrganzation', (req, res) => {
    // if (req.isAuthenticated) {
        const queryText = `SELECT "state", "name", "state_level_organization_id" FROM state_level_organization;`;
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
        const queryText = `SELECT "first_name", "last_name", "state_lead_id" FROM state_lead;`;
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
        const queryText = `SELECT "name", "cohort_id" FROM cohort;`;
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