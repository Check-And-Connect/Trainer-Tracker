let moment = require("moment");
let nodeMailer = require("nodemailer");
const pool = require("../modules/pool");
const ejs = require("ejs");

let transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

//signed ttt agreement email
let tttTermsMail = (emailAddress, localTrainer) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/emailTemplates/tttAgreement.ejs",
      {},
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: "Check And Connect",
            to: emailAddress,
            subject: "Train The Trainer Terms of Agreement",
            html: data,
            attachments: [
              {
                filename: "cc_logo.png",
                path: __dirname + "/emailTemplates/cc_logo.png",
                cid: "cc_logo"
              }
            ]
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              resolve(localTrainer);
            }
          });
        }
      }
    );
  });
};

//Observed Training email
let observedTrainingMail = (emailAddress, localTrainer) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/emailTemplates/observedSession.ejs",
      {},
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: "Check And Connect",
            to: emailAddress,
            subject: "Observed Training Session",
            html: data,
            attachments: [
              {
                filename: "cc_logo.png",
                path: __dirname + "/emailTemplates/cc_logo.png",
                cid: "cc_logo"
              }
            ]
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              resolve(localTrainer);
            }
          });
        }
      }
    );
  });
};

//certification workshop email
let certWorkshopMail = (emailAddress, localTrainer) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/emailTemplates/certificationWorkshop.ejs",
      {},
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: "Check And Connect",
            to: emailAddress,
            subject: "Certification Workshop",
            html: data,
            attachments: [
              {
                filename: "cc_logo.png",
                path: __dirname + "/emailTemplates/cc_logo.png",
                cid: "cc_logo"
              }
            ]
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              resolve(localTrainer);
            }
          });
        }
      }
    );
  });
};

// first C&C training email
let cAndCTrainingMail = (emailAddress, localTrainer) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/emailTemplates/CCtraining.ejs",
      {},
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: "Check And Connect",
            to: emailAddress,
            subject: "Check and Connect Training",
            html: data,
            attachments: [
              {
                filename: "cc_logo.png",
                path: __dirname + "/emailTemplates/cc_logo.png",
                cid: "cc_logo"
              }
            ]
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              resolve(localTrainer);
            }
          });
        }
      }
    );
  });
};

//recertification 1 email
let recertification1Mail = (emailAddress, localTrainer) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/emailTemplates/recertificationWorkshop1.ejs",
      {},
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: "Check And Connect",
            to: emailAddress,
            subject: "Recertification Workshop",
            html: data,
            attachments: [
              {
                filename: "cc_logo.png",
                path: __dirname + "/emailTemplates/cc_logo.png",
                cid: "cc_logo"
              }
            ]
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              resolve(localTrainer);
            }
          });
        }
      }
    );
  });
};

//signed TTT agreement 2, sent after first recertification and second recert
let tttTerms2Mail = (emailAddress, localTrainer) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/emailTemplates/tttAgreement2.ejs",
      {},
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: "Check And Connect",
            to: emailAddress,
            subject: "Train the Trainer Terms of Agreement",
            html: data,
            attachments: [
              {
                filename: "cc_logo.png",
                path: __dirname + "/emailTemplates/cc_logo.png",
                cid: "cc_logo"
              }
            ]
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              resolve(localTrainer);
            }
          });
        }
      }
    );
  });
};

// second C&C training email, 12 months and then 24 months after recert.
let cAndCTraining2Mail = (emailAddress, localTrainer) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/emailTemplates/CCtraining2.ejs",
      {},
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: "Check And Connect",
            to: emailAddress,
            subject: "Check and Connect Training",
            html: data,
            attachments: [
              {
                filename: "cc_logo.png",
                path: __dirname + "/emailTemplates/cc_logo.png",
                cid: "cc_logo"
              }
            ]
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              resolve(localTrainer);
            }
          });
        }
      }
    );
  });
};

//recertification 2 email
let recertification2Mail = (emailAddress, localTrainer) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/emailTemplates/recertificationWorkshop2.ejs",
      {},
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: "Check And Connect",
            to: emailAddress,
            subject: "Recertification Workshop",
            html: data,
            attachments: [
              {
                filename: "cc_logo.png",
                path: __dirname + "/emailTemplates/cc_logo.png",
                cid: "cc_logo"
              }
            ]
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              resolve(localTrainer);
            }
          });
        }
      }
    );
  });
};

// third C&C training email, 12 months and then 24 months after second recert.
let cAndCTraining3Mail = (emailAddress, localTrainer) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/emailTemplates/CCtraining3.ejs",
      {},
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let mailOptions = {
            from: "Check And Connect",
            to: emailAddress,
            subject: "Check and Connect Training",
            html: data,
            attachments: [
              {
                filename: "cc_logo.png",
                path: __dirname + "/emailTemplates/cc_logo.png",
                cid: "cc_logo"
              }
            ]
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
              reject();
            } else {
              resolve(localTrainer);
            }
          });
        }
      }
    );
  });
};

let sendEmail = cohortInfo => {
  let cohortReqId = cohortInfo.cohort_req_id;
  let cohortCycle = cohortInfo.cycle;

  pool
    .query(
      `SELECT * FROM "local_trainers"
            JOIN "local_trainers_requirements" ON "local_trainers"."local_trainers_id" = "local_trainers_requirements"."local_trainers_ref_id"
            WHERE "local_trainers_requirements"."cohort_requirements_ref_id" = ${cohortReqId};`
    )
    .then(results => {
      console.log("---------------");
      console.log(results.rows);
      console.log("---------------");

      let sendEmailsAsync = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index]);
        }
      };

      let start = async () => {
        let emailSentList = [];
        await sendEmailsAsync(results.rows, async localTrainer => {
          if (
            cohortInfo.requirement_id === 2 &&
            cohortCycle === 1 &&
            localTrainer.completed == null
          ) {
            let lc = await tttTermsMail(localTrainer.email, localTrainer);
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 3 &&
            cohortCycle === 1 &&
            localTrainer.completed == null
          ) {
            let lc = await observedTrainingMail(
              localTrainer.email,
              localTrainer
            );
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 4 &&
            cohortCycle === 1 &&
            localTrainer.completed == null
          ) {
            let lc = await certWorkshopMail(localTrainer.email, localTrainer);
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 6 &&
            cohortCycle === 1 &&
            localTrainer.completed == null
          ) {
            let lc = await cAndCTrainingMail(localTrainer.email, localTrainer);
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 7 &&
            cohortCycle === 1 &&
            localTrainer.completed == null
          ) {
            let lc = await recertification1Mail(
              localTrainer.email,
              localTrainer
            );
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 2 &&
            cohortCycle > 1 &&
            localTrainer.completed == null
          ) {
            let lc = await tttTerms2Mail(localTrainer.email, localTrainer);
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 5 &&
            cohortCycle === 2 &&
            localTrainer.completed == null
          ) {
            let lc = await cAndCTraining2Mail(localTrainer.email, localTrainer);
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 6 &&
            cohortCycle === 2 &&
            localTrainer.completed == null
          ) {
            let lc = await cAndCTraining2Mail(localTrainer.email, localTrainer);
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 7 &&
            cohortCycle > 1 &&
            localTrainer.completed == null
          ) {
            let lc = await recertification2Mail(
              localTrainer.email,
              localTrainer
            );
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 5 &&
            cohortCycle > 2 &&
            localTrainer.completed == null
          ) {
            let lc = await cAndCTraining3Mail(localTrainer.email, localTrainer);
            emailSentList.push(lc);
          } else if (
            cohortInfo.requirement_id === 6 &&
            cohortCycle > 2 &&
            localTrainer.completed == null
          ) {
            let lc = await cAndCTraining3Mail(localTrainer.email, localTrainer);
            emailSentList.push(lc);
          }
        });

        sendMailToNationalTrainers(emailSentList, cohortInfo);
        console.log(emailSentList);

        console.log("messege sent to all");
      };

      start();
    });
};

let sendMailToNationalTrainers = (emailSentList, cohortInfo) => {
  console.log("got to the national Trainer list");

  pool
    .query("SELECT * FROM national_trainer")
    .then(response => {
      response.rows.forEach(nt => {
        ejs.renderFile(
          __dirname + "/emailTemplates/nationalTrainerNotification.ejs",
          {
            requirementName: cohortInfo.name,
            cohortName: cohortInfo.cohort_name,
            state: cohortInfo.state,
            slo_name: cohortInfo.slo_name,
            lcList: emailSentList
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let mailOptions = {
                from: "Check And Connect",
                to: nt.email,
                subject: "Check and Connect Training",
                html: data,
                attachments: [
                  {
                    filename: "cc_logo.png",
                    path: __dirname + "/emailTemplates/cc_logo.png",
                    cid: "cc_logo"
                  }
                ]
              };

              transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("messege was sent to nt ");
                }
              });
            }
          }
        );
      });
    })
    .catch(err => {
      console.log(err);
    });
};

let notifier = () => {
  pool
    .query(
      "SELECT *, cohort.name as cohort_name, state_level_organization.name as slo_name  FROM cohort_requirements JOIN cohort on cohort_requirements.cohort_id = cohort.cohort_id JOIN state_level_organization ON state_level_organization.state_level_organization_id = cohort.state_level_organization_ref_id JOIN requirements ON cohort_requirements.requirement_id = requirements.requirements_id"
    )
    .then(response => {
      response.rows.forEach(cohort => {
        if (
          moment(cohort.notification_1_date).format("YYYY-MM-DD") ===
            moment().format("YYYY-MM-DD") ||
          moment(cohort.notification_2_date).format("YYYY-MM-DD") ===
            moment().format("YYYY-MM-DD")
        ) {
          sendEmail(cohort);
          console.log(cohort);
        }
      });
    });
};

module.exports = notifier;
