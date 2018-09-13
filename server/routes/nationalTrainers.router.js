const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const encryptLib = require("../modules/encryption");
const chance = require("chance");
const chanceInstance = new chance();
let moment = require("moment");
let nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "checkandconnect101@gmail.com",
    pass: "1check&connect01"
  }
});

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
      res.sendStatus(500);
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
      res.sendStatus(500);
    });
});

router.get("/confirmEmail/:nt_email", (req, res) => {
  let email = req.params.nt_email;
  console.log("--------------------");

  console.log(email);
  console.log("--------------------");

  let queryText = "SELECT * FROM national_trainer WHERE email = $1";

  pool
    .query(queryText, [email])
    .then(response => {
      if (response.rows.length > 0) {
        res.send([
          {
            email: response.rows[0].email
          }
        ]);
      } else {
        res.send([
          {
            email: ""
          }
        ]);
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/requestPasswordReset", (req, res) => {
  console.log(req.body);
  const token = chanceInstance.hash();
  let now = moment().format();
  console.log(token);

  let queryText =
    "UPDATE national_trainer SET pw_reset_token = $1, pw_reset_time = $2 WHERE email = $3";

  pool
    .query(queryText, [token, now, req.body.email])
    .then(respone => {
      let text = `
      <div>
        <h3>Click the link to reset your password. The following link will expire in 1 hour.</h3>
        <br/>
        <a href="http://localhost:3000/#/password_reset/${token}">Click here to reset your password</a>
        </div>
      `;

      let mailOptions = {
        from: "checkandconnect@gmail.com",
        to: req.body.email,
        subject: "Check And Connect Password Reset",
        html: text
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          console.log("email sent" + info.response);
          res.sendStatus(205);
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put("/resetPassword", (req, res) => {
  console.log(req.body);

  let getPWResetTime = `SELECT *  FROM national_trainer WHERE pw_reset_token = $1`;

  let updatePassQuery =
    "UPDATE national_trainer SET password = $1 WHERE pw_reset_token = $2";
  pool
    .query(getPWResetTime, [req.body.token])
    .then(response => {
      if (response.rows.length !== 0) {
        console.log(response.rows[0].pw_reset_time);
        let time = moment(response.rows[0].pw_reset_time).format(
          "YYYY-MM-DD HH:mm:SS"
        );
        let now = moment().format("YYYY-MM-DD HH:mm:ss");
        let timeDifference = moment(now).diff(moment(time), "hours");
        console.log(timeDifference);
        
        if (timeDifference > 0) {
          res.send([
            {
              error: "Link Expired"
            }
          ]);
        } else {
          const newPass = encryptLib.encryptPassword(req.body.password);
          pool
            .query(updatePassQuery, [newPass, req.body.token])
            .then(response => {
              res.send([
                {
                  success: "Password Updated"
                }
              ]);
            });
        }
      } else {
        res.send([
          {
            error: "Invalid Link"
          }
        ]);
      }
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
