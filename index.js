const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

app.use(express.json());

const db = require('./models');

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Aplikacija pokrenuta');
    });
});
