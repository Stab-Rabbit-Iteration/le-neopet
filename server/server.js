const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
require('dotenv').config({path: __dirname + '/.uri.env'});
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/authRouter');
const createRouter = require('./routes/createRouter');

// handle parsing request body
app.use(express.json()); // parses body EXCEPT html
app.use(cookieParser())
app.use(express.urlencoded({ extended: true })); // parses html

app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);

// handle static serve in production
// app.use('/dist', express.static(path.resolve(__dirname, '../dist')));
// app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

// handle api router
app.use('/auth', authRouter);
app.use('/create', createRouter);
// app.use('/petPage', petPageRouter);


app.use('*', (req, res) => res.status(404).send('this is the server route'));


// global error
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// listen for port & connect mongoose db
const start = async () => {

  app.listen(3000, async () => {
    console.log('Server started listening on port: 3000');
    try {
      await mongoose.connect(process.env.MONGO_URI, {});
      console.log('Connected to Mongo DB.');
    } catch (error) {
      console.log(error);
    }
  });
}

start()
