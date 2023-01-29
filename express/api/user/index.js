// 라우팅 설정 로직

const express = require('express');
const router = express.Router();

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

router.get('/', function (req, res) {
  req.query.limit = req.query.limit || 10;

  const limit = parseInt(req.query.limit, 10);

  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }

  res.json(users.slice(0, limit));
});

router.get('/:id', function (req, res) {
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

router.delete('/:id', function (req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).end();
  }

  users = users.filter((user) => user.id !== id);

  return res.status(204).end();
});

router.post('/', function (req, res) {
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

router.put('/:id', function (req, res) {
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

module.exports = router;