const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
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