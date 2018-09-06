const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/stateLead', (req, res) => {
    // if (req.isAuthenticated) {
        console.log('got to statelead');
        
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

module.exports = router;