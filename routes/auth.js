const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { Users } = require('../models');
const { Employees } = require('../models');
const { registerEmployeeValidator } = require('../validators/employees.js');
const { loginUserValidator } = require('../validators/users.js');
const { validationResult } = require('express-validator');
const { authAdminMiddleware } = require('../middlewares/auth-middleware');

router.post(
    '/register',
    authAdminMiddleware,
    registerEmployeeValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);

        const {
            ime,
            prezime,
            broj_telefona,
            adresa,
            email_adresa,
            datum_zaposlenja,
            datum_otkaza,
            sifra,
            uloga,
        } = req.body;
        let username = ime.toLowerCase() + '_' + prezime.toLowerCase();
        let hash = await bcrypt.hash(sifra, 10);

        const zaposlenik = await Employees.create({
            ime: ime,
            prezime: prezime,
            broj_telefona: broj_telefona,
            adresa: adresa,
            email_adresa: email_adresa,
            datum_zaposlenja: datum_zaposlenja,
            datum_otkaza: datum_otkaza,
        });

        await Users.create({
            username: username,
            password: hash,
            uloga: uloga,
            zaposlenikId: zaposlenik.id,
        });
        return res.status(201).json();
    }
);

router.post('/login', loginUserValidator, async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json();
    }

    const user = await Users.findOne({ where: { username: username } });
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const token = sign(
            {
                id: user.id,
                username: user.username,
                uloga: user.uloga,
            },
            process.env.SECRET
        );

        return res.status(200).json({
            accessToken: token,
        });
    }
    return res.status(401).json();
});

module.exports = router;
