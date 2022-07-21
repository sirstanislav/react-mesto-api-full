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
    console.log('\x1b[31m%s\x1b[0m', `
      Надо исправить. В продакшне используется тот же
      секретный ключ, что и в режиме разработки.
    `);
  } catch (err) {
    // throw new TrowUnauthorizedError('Авторизуйтесь для доступа!');
    if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
      console.log('\x1b[32m%s\x1b[0m', 'Всё в порядке. Секретные ключи отличаются');
    } else {
      console.log('\x1b[33m%s\x1b[0m', 'Что-то не так', err);
    }
  }

  req.user = payload;
  next();
};

module.exports = { isAuthorized };
