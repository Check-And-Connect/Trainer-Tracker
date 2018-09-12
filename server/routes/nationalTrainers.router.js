const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const encryptLib = require("../modules/encryption");

router.get("/", (req, res) => {
  let getNationalTrainersQuery =
    "SELECT national_trainer_id, first_name, last_name, email, title , status FROM national_trainer";

  pool
    .query(getNationalTrainersQuery)
    .then(response => {
      console.log(response.rows);
      res.send(response.rows);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get("/getNTDetails", (req, res) => {
  let getNTDetailsQuery =
    "SELECT national_trainer_id, first_name, last_name, email, title FROM national_trainer WHERE national_trainer_id = $1";
  pool
    .query(getNTDetailsQuery, [req.user.national_trainer_id])
    .then(response => {
      console.log('NTDetails', response.rows[0]);
      res.send(response.rows[0]);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/addNew", (req, res) => {
  console.log("req: ", req.body);

  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const title = req.body.title;
  const queryText = `INSERT INTO national_trainer (first_name, last_name, email, title, user_name, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING national_trainer_id`;
  pool
    .query(queryText, [first_name, last_name, email, title, username, password])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
        res.sendStatus(500)
    });
});

router.post("/changeStatus/:id", (req, res) => {
  let queryText =
    "UPDATE national_trainer SET status = NOT status WHERE national_trainer_id = $1";

  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500)
    });
});

module.exports = router;
