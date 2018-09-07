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

module.exports = router;