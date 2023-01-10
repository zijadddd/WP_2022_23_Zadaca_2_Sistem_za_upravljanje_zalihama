const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { Korisnici } = require('../models');
const { Zaposlenici } = require('../models');
const {
    registrujZaposlenikaValidator,
} = require('../validators/zaposlenici.js');
const { loginKorisnikaValidator } = require('../validators/korisnici.js');
const { validationResult } = require('express-validator');
const { authMiddleware } = require('../middlewares/auth-middleware');

router.post(
    '/register',
    authMiddleware,
    registrujZaposlenikaValidator,
    async (req, res) => {
        const ulogaKorisnika = req.params.uloga;
        if (ulogaKorisnika != 'Admin') return res.status(401).json();

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

        const zaposlenik = await Zaposlenici.create({
            ime: ime,
            prezime: prezime,
            broj_telefona: broj_telefona,
            adresa: adresa,
            email_adresa: email_adresa,
            datum_zaposlenja: datum_zaposlenja,
            datum_otkaza: datum_otkaza,
        });

        await Korisnici.create({
            username: username,
            password: hash,
            uloga: uloga,
            zaposlenikId: zaposlenik.id,
        });
        return res.status(201).json();
    }
);

router.post('/login', loginKorisnikaValidator, async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json();
    }

    const korisnik = await Korisnici.findOne({ where: { username: username } });
    const isPasswordValid = await bcrypt.compare(password, korisnik.password);

    if (isPasswordValid) {
        const token = sign(
            {
                id: korisnik.id,
                username: korisnik.username,
                uloga: korisnik.uloga,
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
