const express = require('express');
const morgan = require('morgan');
const app = express();

// 미들웨어는 인터페이스가 정해져 있음
// (req, res, next) => {}
function logger(req, res, next) {
  console.log('i am logger');
  next();
}

function logger2(req, res, next) {
  console.log('i am logger2');
  next();
}

// 미들웨어 사용
app.use(logger);
app.use(logger2);
app.use(morgan('dev'));

// 일반 미들웨어
function commonMW(req, res, next) {
  console.log('common MW');
  next(new Error('error occured'));
}

// 에러 미들웨어
function errorMW(err, req, res, next) {
  console.log(err.message);

  // 에러를 처리하거나
  next();

  // 에러를 처리하지 못했다면 그대로 next에 넘김
  // next(err);
}

app.use(commonMW);
app.use(errorMW);

app.listen(3000, function () {
  console.log('Server is running');
});
