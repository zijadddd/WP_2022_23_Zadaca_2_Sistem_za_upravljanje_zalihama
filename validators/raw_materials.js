const { check } = require('express-validator');
const {
    RAW_MATERIALS_NAME_REQUIRED,
    RAW_MATERIALS_MIN_AMOUNT_REQUIRED,
    RAW_MATERIALS_PRICE_REQUIRED,
    RAW_MATERIALS_UNIT_OF_MEASUREMENT_REQUIRED,
    RAw_MATERIALS_USABLE,
    RAW_MATERIAL_SUPPLIER_ID_REQUIRED,
} = require('../constants/validators/raw-material-constants');

exports.addNewRawMaterial = [
    check('name').notEmpty().withMessage(RAW_MATERIALS_NAME_REQUIRED).bail(),
    check('min_amount')
        .notEmpty.withMessage(RAW_MATERIALS_MIN_AMOUNT_REQUIRED)
        .bail(),
    check('price').notEmpty().withMessage(RAW_MATERIALS_PRICE_REQUIRED).bail(),
    check('unit_of_measurement')
        .notEmpty()
        .withMessage(RAW_MATERIALS_UNIT_OF_MEASUREMENT_REQUIRED)
        .bail(),
    check('usable').notEmpty().withMessage(RAw_MATERIALS_USABLE).bail(),
    check('supplier_id')
        .notEmpty()
        .withMessage(RAW_MATERIAL_SUPPLIER_ID_REQUIRED)
        .bail(),
    (req, res, next) => {
        next();
    },
];

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
