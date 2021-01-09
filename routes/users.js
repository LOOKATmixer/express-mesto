const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;

const fileSrc = path.join(__dirname, "../data/users.json");

function readFile(file) {
  return fs.readFile(file).then((text) => JSON.parse(text));
}

router.get("/", (req, res) => {
  readFile(fileSrc)
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  readFile(fileSrc)
    .then((users) => {
      const user = users.find((use) => use._id === id);
      if (!user) {
        res.status(404).send({ message: "Нет пользователя с таким id" });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
