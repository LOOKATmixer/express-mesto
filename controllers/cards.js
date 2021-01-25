const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(() => {
      res.status(500).send({ message: "Ошибка сервера" });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err === "ValidationError") {
        return res.status(400).send({ message: "Ошибка валидации" });
      }
      return res.status(500).send({ message: "Ошибка сервера" });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: "Нет карточки с таким id" });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
      } else {
        res.status(500).send({ message: "Ошибка сервера" });
      }
    });
};

const likeCard = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).send({ message: "Такой карточки не существует" });
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },

    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(400).send({ message: `${err}` }));
};

const dislikeCard = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(404).send({ message: "Такой карточки не существует" });
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => res.status(400).send({ message: `${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
