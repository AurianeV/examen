const express = require('express');
const dayjs = require('dayjs');
const path = require('path');
const dotenv = require('dotenv');
const utils = require('./utils');

dotenv.config();

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'home.html'));
});

app.get('/users', (req, res) => {
  const users = utils.getUsers();
  res.send(`<pre>${JSON.stringify(users, null, 2)}</pre>`);
});

app.post('/add-user', (req, res) => {
  const { name, birth } = req.body;
  if (name && birth) {
    utils.addUser(name, dayjs(birth).format('DD-MM-YYYY'));
  }
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
