const express = require("express");
const bodyParser = require("body-parser");

const { PORT = 3000 } = process.env;

const app = express();
const routes = require("./routes/index");

app.use("/", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);
app.use((req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
});

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
