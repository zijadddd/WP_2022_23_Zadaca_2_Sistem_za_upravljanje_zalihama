const express = require('express');
const app = express();
const dotenv = require('dotenv').config();

app.use(express.json());

const db = require('./models');

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const userRoutes = require('./routes/user-routes');
app.use('/api/user', userRoutes);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Aplikacija pokrenuta');
    });
});

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
