const { check } = require('express-validator');
const { Employees } = require('../models');
const {
    EMPLOYEE_FIRSTNAME_REQUIRED,
    EMPLOYEE_LASTNAME_REQUIRED,
    EMPLOYEE_PHONE_NUMBER_REQUIRED,
    EMPLOYEE_ADDRESS_REQUIRED,
    EMPLOYEE_EMAIL_ADDRESS_REQUIRED,
    EMPLOYEE_EMAIL_ALREADY_EXISTS,
    EMPLOYEE_DATE_OF_EMPLOYMENT_REQUIRED,
} = require('../constants/validators/employees-constants');

exports.registerEmployeeValidator = [
    check('ime').notEmpty().withMessage(EMPLOYEE_FIRSTNAME_REQUIRED).bail(),
    check('prezime').notEmpty().withMessage(EMPLOYEE_LASTNAME_REQUIRED).bail(),
    check('broj_telefona')
        .notEmpty()
        .withMessage(EMPLOYEE_PHONE_NUMBER_REQUIRED)
        .bail(),
    check('adresa').notEmpty().withMessage(EMPLOYEE_ADDRESS_REQUIRED).bail(),
    check('email_adresa')
        .notEmpty()
        .withMessage(EMPLOYEE_EMAIL_ADDRESS_REQUIRED)
        .custom(async (value) => {
            const employee = await Employees.findOne({
                where: { email_adresa: value },
            });
            if (employee != null)
                return Promise.reject(EMPLOYEE_EMAIL_ALREADY_EXISTS(value));
        })
        .bail(),
    check('datum_zaposlenja')
        .notEmpty()
        .withMessage(EMPLOYEE_DATE_OF_EMPLOYMENT_REQUIRED)
        .bail(),
    (req, res, next) => {
        next();
    },
];

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
