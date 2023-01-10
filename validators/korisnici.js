const { check } = require('express-validator');
const {
    USER_USERNAME_REQUIRED,
    USER_SIFRA_REQUIRED,
} = require('../constants/validators/korisnici-constants');
const { Korisnici } = require('../models');

exports.loginKorisnikaValidator = [
    check('username').notEmpty().withMessage(USER_USERNAME_REQUIRED).bail(),
    check('password').notEmpty().withMessage(USER_SIFRA_REQUIRED).bail(),
    (req, res, next) => {
        next();
    },
];
