const error = (err, res, errorName, errorMessage) => {
  if (err.name === errorName) {
    return res.status(400).send({
      message: errorMessage,
    });
  }
  return res.status(500).send({ message: '500 — Ошибка по умолчанию' });
};

module.exports = {
  error,
};
