const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    let getNationalTrainersQuery = 'SELECT national_trainer_id, first_name, last_name FROM national_trainer';

    pool.query(getNationalTrainersQuery)
        .then(response => {
            console.log(response.rows);
            res.send(response.rows);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500) 
        })
})


module.exports = router;