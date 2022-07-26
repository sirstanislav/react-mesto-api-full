const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const { TrowUnauthorizedError } = require('../errors/trowUnauthorizedError');

let payload;

const isAuthorized = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new TrowUnauthorizedError('Авторизуйтесь для доступа!');
  }

  const token = auth.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new TrowUnauthorizedError('Авторизуйтесь для доступа!');
  }

  req.user = payload;
  next();
};

module.exports = { isAuthorized };
