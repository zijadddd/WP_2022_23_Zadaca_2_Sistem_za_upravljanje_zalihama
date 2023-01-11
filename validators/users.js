const { check } = require('express-validator');
const {
    USER_USERNAME_REQUIRED,
    USER_PASSWORD_REQUIRED,
    USER_ID_REQUIRED,
} = require('../constants/validators/users-constants');

const changeUserPasswordValidator = [
    check('id').notEmpty().withMessage(USER_ID_REQUIRED).bail(),
    check('password').notEmpty().withMessage(USER_PASSWORD_REQUIRED).bail(),
    (req, res, next) => {
        next();
    },
];

const loginUserValidator = [
    check('username').notEmpty().withMessage(USER_USERNAME_REQUIRED).bail(),
    check('password').notEmpty().withMessage(USER_PASSWORD_REQUIRED).bail(),
    (req, res, next) => {
        next();
    },
];

module.exports = {
    changeUserPasswordValidator,
    loginUserValidator,
};
