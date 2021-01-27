const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// eslint-disable-next-line no-console
mongoose.connection.on('open', () => console.log('db connected!'));
// eslint-disable-next-line no-console
mongoose.connection.on('error', () => console.log('db NOT connected!'));

app.use((req, res, next) => {
  req.user = {
    _id: '600e6d5e4619c00e0198d02d',
  };

  next();
});
app.use('/', router);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ссылка на сервер: ${PORT}`);
});
