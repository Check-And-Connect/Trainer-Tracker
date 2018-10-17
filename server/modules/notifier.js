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
let tttTermsMail = (emailAddress , firstName) => {
  ejs.renderFile(__dirname + '/emailTemplates/tttAgreement.ejs', {}, (err, data) => {
    if(err){
      console.log(err);
    }else{
      
      let mailOptions = {
        from: "Check And Connect",
        to: emailAddress,
        subject: "Train The Trainer Terms of Agreement",
        html: data,
        attachments : [{
          filename : 'cc_logo.png',
          path : __dirname + '/emailTemplates/cc_logo.png' ,
          cid : 'cc_logo'
        }]
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + info.response);
          console.log('email sent to ' + firstName);
          
        }
      });


    }
  })
}

//Observed Training email
let observedTrainingMail = (emailAddress) => {
  ejs.renderFile(__dirname + '/emailTemplates/observedSession.ejs', {}, (err, data) => {
    if(err){
      console.log(err);
    }else{
      
      let mailOptions = {
        from: "Check And Connect",
        to: emailAddress,
        subject: "Observed Training Session",
        html: data,
        attachments : [{
          filename : 'cc_logo.png',
          path : __dirname + '/emailTemplates/cc_logo.png' ,
          cid : 'cc_logo'
        }]
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + info.response);
          console.log('email sent to ' + firstName);
          
        }
      });


    }
  })
}

//certification workshop email
let certWorkshopMail = (emailAddress) => {
  ejs.renderFile(__dirname + '/emailTemplates/certificationWorkshop.ejs', {}, (err, data) => {
    if(err){
      console.log(err);
    }else{
      
      let mailOptions = {
        from: "Check And Connect",
        to: emailAddress,
        subject: "Certification Workshop",
        html: data,
        attachments : [{
          filename : 'cc_logo.png',
          path : __dirname + '/emailTemplates/cc_logo.png' ,
          cid : 'cc_logo'
        }]
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + info.response);
          console.log('email sent to ' + firstName);
          
        }
      });


    }
  })
}

// first C&C training email
let cAndCTrainingMail = (emailAddress) => {
  ejs.renderFile(__dirname + '/emailTemplates/CCtraining.ejs', {}, (err, data) => {
    if(err){
      console.log(err);
    }else{
      
      let mailOptions = {
        from: "Check And Connect",
        to: emailAddress,
        subject: "Check and Connect Training",
        html: data,
        attachments : [{
          filename : 'cc_logo.png',
          path : __dirname + '/emailTemplates/cc_logo.png' ,
          cid : 'cc_logo'
        }]
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + info.response);
          console.log('email sent to ' + firstName);
          
        }
      });
    }
  })
}

//recertification 1 email 
let recertification1Mail = (emailAddress) => {
  ejs.renderFile(__dirname + '/emailTemplates/recertificationWorkshop1.ejs', {}, (err, data) => {
    if(err){
      console.log(err);
    }else{
      
      let mailOptions = {
        from: "Check And Connect",
        to: emailAddress,
        subject: "Recertification Workshop",
        html: data,
        attachments : [{
          filename : 'cc_logo.png',
          path : __dirname + '/emailTemplates/cc_logo.png' ,
          cid : 'cc_logo'
        }]
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + info.response);
          console.log('email sent to ' + firstName);
          
        }
      });
    }
  })
}

//signed TTT agreement 2, sent after first recertification and second recert
let tttTerms2Mail = (emailAddress , firstName) => {
  ejs.renderFile(__dirname + '/emailTemplates/tttAgreement2.ejs', {}, (err, data) => {
    if(err){
      console.log(err);
    }else{
      
      let mailOptions = {
        from: "Check And Connect",
        to: emailAddress,
        subject: "Train the Trainer Terms of Agreement",
        html: data,
        attachments : [{
          filename : 'cc_logo.png',
          path : __dirname + '/emailTemplates/cc_logo.png' ,
          cid : 'cc_logo'
        }]
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + info.response);
          console.log('email sent to ' + firstName);       
        }
      });
    }
  })
}

// second C&C training email, 12 months and then 24 months after recert.
let cAndCTraining2Mail = (emailAddress) => {
  ejs.renderFile(__dirname + '/emailTemplates/CCtraining2.ejs', {}, (err, data) => {
    if(err){
      console.log(err);
    }else{
      
      let mailOptions = {
        from: "Check And Connect",
        to: emailAddress,
        subject: "Check and Connect Training",
        html: data,
        attachments : [{
          filename : 'cc_logo.png',
          path : __dirname + '/emailTemplates/cc_logo.png' ,
          cid : 'cc_logo'
        }]
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + info.response);
          console.log('email sent to ' + firstName);
          
        }
      });
    }
  })
}

//recertification 2 email 
let recertification2Mail = (emailAddress) => {
  ejs.renderFile(__dirname + '/emailTemplates/recertificationWorkshop2.ejs', {}, (err, data) => {
    if(err){
      console.log(err);
    }else{
      
      let mailOptions = {
        from: "Check And Connect",
        to: emailAddress,
        subject: "Recertification Workshop",
        html: data,
        attachments : [{
          filename : 'cc_logo.png',
          path : __dirname + '/emailTemplates/cc_logo.png' ,
          cid : 'cc_logo'
        }]
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + info.response);
          console.log('email sent to ' + firstName);
          
        }
      });
    }
  })
}

// third C&C training email, 12 months and then 24 months after second recert.
let cAndCTraining3Mail = (emailAddress) => {
  ejs.renderFile(__dirname + '/emailTemplates/CCtraining3.ejs', {}, (err, data) => {
    if(err){
      console.log(err);
    }else{
      
      let mailOptions = {
        from: "Check And Connect",
        to: emailAddress,
        subject: "Check and Connect Training",
        html: data,
        attachments : [{
          filename : 'cc_logo.png',
          path : __dirname + '/emailTemplates/cc_logo.png' ,
          cid : 'cc_logo'
        }]
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("email sent" + info.response);
          console.log('email sent to ' + firstName);
          
        }
      });
    }
  })
}


let sendEmail = (notificaitonType, cohortInfo) => {
  let cohortId = cohortInfo.cohort_id;

  pool
    .query(`SELECT * FROM local_trainers WHERE cohort_ref_id = ${cohortId}`)
    .then(results => {

      results.rows.forEach(localTrainer => {
        if(cohortInfo.requirement_id === 2){
          tttTermsMail(localTrainer.email , localTrainer.first_name)
        }else if(cohortInfo.requirement_id === 3){
          observedTrainingMail(localTrainer.email , localTrainer.first_name)
        }else if(cohortInfo.requirement_id === 4){
          certWorkshopMail(localTrainer.email , localTrainer.first_name)
        }else if(cohortInfo.requirement_id === 5){
          cAndCTrainingMail(localTrainer.email , localTrainer.first_name)
        }

      });
    });
};
let notifier = () => {
  pool.query("SELECT * FROM cohort_requirements ").then(response => {
    console.log(response.rows[0]);

    console.log(
      moment(response.rows[0].notification_1_date).format("YYYY-MM-DD")
    );
    console.log(moment().format("YYYY-MM-DD"));

    response.rows.forEach(cohort => {
      if (
        moment(cohort.notification_1_date).format("YYYY-MM-DD") ===
        moment().format("YYYY-MM-DD")
      ) {
        sendEmail("notification_1", cohort);
      } else if (
        moment(cohort.notification_2_date).format("YYYY-MM-DD") ===
        moment().format("YYYY-MM-DD")
      ) {
        sendEmail('notification_2' , cohort)
      }
    });
  });
};

module.exports = notifier;
