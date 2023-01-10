const { check } = require('express-validator');
const {
    KORISNIK_IME_REQUIRED,
    KORISNIK_PREZIME_REQUIRED,
    KORISNIK_BROJ_TELEFONA_REQUIRED,
    KORISNIK_ADRESA_REQUIRED,
    KORISNIK_EMAIL_ADRESA_REQUIRED,
    KORISNIK_DATUM_ZAPOSLENJA_REQUIRED,
} = require('../constants/validators/zaposlenici-constants');

exports.registrujZaposlenikaValidator = [
    check('ime').notEmpty().withMessage(KORISNIK_IME_REQUIRED).bail(),
    check('prezime').notEmpty().withMessage(KORISNIK_PREZIME_REQUIRED).bail(),
    check('broj_telefona')
        .notEmpty()
        .withMessage(KORISNIK_BROJ_TELEFONA_REQUIRED)
        .bail(),
    check('adresa').notEmpty().withMessage(KORISNIK_ADRESA_REQUIRED).bail(),
    check('email_adresa')
        .notEmpty()
        .withMessage(KORISNIK_EMAIL_ADRESA_REQUIRED)
        .bail(),
    check('datum_zaposlenja')
        .notEmpty()
        .withMessage(KORISNIK_DATUM_ZAPOSLENJA_REQUIRED)
        .bail(),
    (req, res, next) => {
        next();
    },
];
