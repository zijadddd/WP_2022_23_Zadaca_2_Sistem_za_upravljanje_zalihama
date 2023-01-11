const { check } = require('express-validator');
const {
    USER_USERNAME_REQUIRED,
    USER_PASSWORD_REQUIRED,
} = require('../constants/validators/users-constants');

exports.loginUserValidator = [
    check('username').notEmpty().withMessage(USER_USERNAME_REQUIRED).bail(),
    check('password').notEmpty().withMessage(USER_PASSWORD_REQUIRED).bail(),
    (req, res, next) => {
        next();
    },
];
