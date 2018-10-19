
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const localTrainersRouter = require('./routes/localTrainers.router');
const nationalTrainersRouter = require('./routes/nationalTrainers.router');
const cohortsRouter = require('./routes/cohorts.router');
const stateLeadsRouter = require('./routes/stateLeads.router');

const cron = require('node-cron');
const notifier = require('./modules/notifier');


// cron.schedule('0 8 * * *', () => {
//   notifier()

// }, {
//   scheduled : true,
//   timezone : 'America/Chicago'
// });

// cron.schedule('*/15 * * * * *', () => {
//    notifier()
// })


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());



/* Routes */
app.use('/api/user', userRouter);
app.use('/api/localTrainers', localTrainersRouter);
app.use('/api/nationalTrainers', nationalTrainersRouter);
app.use('/api/cohorts', cohortsRouter);
app.use('/api/stateLeads', stateLeadsRouter);


// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
