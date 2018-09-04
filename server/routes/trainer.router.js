const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // if (req.isAuthenticated) {
        const queryText = `SELECT "state", "name" FROM state_level_organization;`;
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

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;