const { check } = require('express-validator');
const {
    SUPPLIER_NAME_REQUIRED,
    SUPPLIER_UID_REQUIRED,
    SUPPLIER_VAT_REQUIRED,
    SUPPLIER_PHONE_NUMBER_REQUIRED,
    SUPPLIER_CONTACT_PERSON,
    SUPPLIER_EMAIL_ADDRESS,
    SUPPLIER_START_DATE,
} = require('../constants/validators/suppliers-constants');

exports.addNewSupplier = [
    check('name').notEmpty().withMessage(SUPPLIER_NAME_REQUIRED).bail(),
    check('uid').notEmpty().withMessage(SUPPLIER_UID_REQUIRED).bail(),
    check('vat').notEmpty().withMessage(SUPPLIER_VAT_REQUIRED).bail(),
    check('phoneNumber')
        .notEmpty()
        .withMessage(SUPPLIER_PHONE_NUMBER_REQUIRED)
        .bail(),
    check('contactPerson')
        .notEmpty()
        .withMessage(SUPPLIER_CONTACT_PERSON)
        .bail(),
    check('emailAddress').notEmpty().withMessage(SUPPLIER_EMAIL_ADDRESS).bail(),
    check('startDate').notEmpty().withMessage(SUPPLIER_START_DATE).bail(),
    (req, res, next) => {
        next();
    },
];

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
