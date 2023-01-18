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

  if (!name) {
    return res.status(400).end();
  }

  const isConflict = users.find((user) => user.name === name);

  if (isConflict) {
    return res.status(409).end();
  }

  res.status(201).json(user);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000');
});

module.exports = app;
