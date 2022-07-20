const Card = require('../models/card');
const { ValidationError } = require('../errors/ValidationError');
const { NoValidId } = require('../errors/NoValidId');
const { NoPermission } = require('../errors/NoPermission');
const { CastError } = require('../errors/CastError');

module.exports.returnCards = (req, res, next) => {
  Card.find()
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('400 - Переданы некорректные данные в метод создания карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      const owner = card.owner.toHexString();
      if (!card) {
        next(new NoValidId('404 - Карточка с указанным _id не найдена'));
      } else if (owner === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .orFail(new Error('NoValidId'))
          .then((cardDeleted) => res.send(cardDeleted))
          .catch((err) => {
            if (err.message === 'NoValidId') {
              next(new NoValidId('404 - Карточка с указанным _id не найдена'));
            } else {
              next(err);
            }
          });
      } else {
        next(new NoPermission('403 — попытка удалить чужую карточку;'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('400 —  Карточка с указанным _id не найдена'));
      } else if (err.name === 'TypeError') {
        next(new NoValidId('404 - Удаление карточки с несуществующим в БД id'));
      } else {
        next(err);
      }
    });
};

module.exports.setLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NoValidId'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NoValidId') {
        next(new NoValidId('404 — Передан несуществующий _id карточки'));
      } else {
        next(new Error('Ошибка. Что-то пошло не так...'));
      }
    });
};

module.exports.unsetLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NoValidId'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NoValidId') {
        next(new NoValidId('404 — Передан несуществующий _id карточки'));
      } else {
        next(new Error('Ошибка. Что-то пошло не так...'));
      }
    });
};
