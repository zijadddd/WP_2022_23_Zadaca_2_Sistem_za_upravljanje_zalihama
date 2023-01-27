const express = require('express');
const router = express.Router();
const { RawMaterials } = require('../models');
const { Suppliers } = require('../models');
const { validationResult } = require('express-validator');
const { addNewRawMaterial } = require('../validators/raw-materials');
const { authAllUsersMiddleware } = require('../middlewares/auth-middleware');

router.post(
    '/addnewrawmaterial',
    authAllUsersMiddleware,
    addNewRawMaterial,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);

        const {
            name,
            minAmount,
            price,
            unitOfMeasurement,
            usable,
            supplierId,
        } = req.body;
        const supplier = await Suppliers.findByPk(supplierId);

        if (supplier == null)
            return res
                .status(400)
                .json('Supplier does not exist in the database');

        RawMaterials.create({
            name: name,
            minAmount: minAmount,
            price: price,
            unitOfMeasurement: unitOfMeasurement,
            usable: usable,
            supplierId: supplierId,
        });

        return res.status(200).json(`Raw material ${name} added successfully.`);
    }
);

router.post(
    '/changerawmaterialdata/:id',
    authAllUsersMiddleware,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);
        const {
            name,
            minAmount,
            price,
            unitOfMeasurement,
            usable,
            supplierId,
        } = req.body;

        try {
            const rawMaterial = await RawMaterials.findByPk(req.params.id);

            if (rawMaterial == null)
                throw 'The raw material does not exist in the database';

            if (name != null) rawMaterial.name = name;
            if (minAmount != null) rawMaterial.minAmount = minAmount;
            if (price != null) rawMaterial.price = price;
            if (unitOfMeasurement != null)
                rawMaterial.unitOfMeasurement = unitOfMeasurement;
            if (usable != null) rawMaterial.usable = usable;
            if (supplierId != null) {
                const supplier = await Suppliers.findByPk(supplierId);

                if (supplier == null)
                    return res
                        .status(400)
                        .json('Supplier does not exist in the database');

                rawMaterial.supplierId = supplierId;
            }

            await rawMaterial.save();

            return res.status(201).json(rawMaterial);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
);

router.get('/getallrawmaterials', authAllUsersMiddleware, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);
    const rawMaterials = await RawMaterials.findAll();
    return res.status(200).json(rawMaterials);
});

router.delete(
    '/deleterawmaterial/:id',
    authAllUsersMiddleware,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);
        try {
            const rawMaterial = await RawMaterials.findByPk(req.params.id);
            if (rawMaterial == null)
                throw `Raw material with id ${req.params.id} does not exist in the database`;

            await RawMaterials.destroy({ where: { id: req.params.id } });
            return res
                .status(200)
                .json(
                    `Raw material with id ${req.params.id} removed successfully.`
                );
        } catch (err) {
            res.status(400).json(err);
        }
    }
);

module.exports = router;

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
