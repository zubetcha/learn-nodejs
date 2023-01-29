const express = require('express');
const morgan = require('morgan');
const user = require('./api/user');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// /users 경로로 들어오는 모든 요청은 user 모듈이 담당
app.use('/users', user);

module.exports = app;
