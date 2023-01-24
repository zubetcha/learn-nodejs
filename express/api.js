const express = require('express');
const morgan = require('morgan');

const app = express();

let users = [
  {
    id: 1,
    name: 'zubetcha',
  },
  {
    id: 2,
    name: 'cookie',
  },
  {
    id: 3,
    name: 'cake',
  },
];

app.use(morgan('dev'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/users', function (req, res) {
  req.query.limit = req.query.limit || 10;

  const limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  res.json(users.slice(0, limit));
});

app.get('/users/:id', function (req, res) {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).end();
  }

  res.json(user);
});

app.delete('/users/:id', function (req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  users = users.filter((user) => user.id !== id);

  return res.status(204).end();
});

app.post('/users', function (req, res) {
  const name = req.body.name;
  const id = Date.now();
  const user = { name, id };

  users.push(user);

  // name 프로퍼티 체크
  if (!name) {
    return res.status(400).end();
  }

  // 중복 체크
  const isConflict = users.some((user) => user.name === name);

  console.log(users);

  if (isConflict) {
    return res.status(409).end();
  }

  res.status(201).json(user);
});

app.put('/users/:id', function (req, res) {
  const id = parseInt(req.params.id);
  const name = req.body.name;
  const user = users.find((user) => user.id === id);
  const isConflic = users.some((user) => user.name === name);

  if (Number.isNaN(id) || !name) {
    return res.status(400).end();
  }

  if (!user) {
    return res.status(404).end();
  }

  if (isConflic) {
    return res.status(409).end();
  }

  user.name = name;

  res.json(user);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});

module.exports = app;
