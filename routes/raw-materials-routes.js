const express = require('express');
const router = express.Router();
const { RawMaterials } = require('../models');
const { Suppliers } = require('../models');
const { validationResult } = require('express-validator');
const { addNewRawMaterial } = require('../validators/suppliers');
const { authAllUsersMiddleware } = require('../middlewares/auth-middleware');

module.exports = router;

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
