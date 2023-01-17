const express = require('express');
const router = express.Router();
const { Suppliers } = require('../models');
const { validationResult } = require('express-validator');
const { addNewSupplier } = require('../validators/suppliers.js');
const { authAllUsersMiddleware } = require('../middlewares/auth-middleware');

router.post(
    '/addnewsupplier',
    authAllUsersMiddleware,
    addNewSupplier,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);

        const {
            name,
            uid,
            vat,
            phoneNumber,
            contactPerson,
            emailAddress,
            startDate,
            endDate,
        } = req.body;

        if (endDate === 'null') {
            await Suppliers.create({
                name: name,
                uid: uid,
                vat: vat,
                phoneNumber: phoneNumber,
                contactPerson: contactPerson,
                emailAddress: emailAddress,
                startDate: startDate,
            });
        } else {
            await Suppliers.create({
                name: name,
                uid: uid,
                vat: vat,
                phoneNumber: phoneNumber,
                contactPerson: contactPerson,
                emailAddress: emailAddress,
                startDate: startDate,
                endDate: endDate,
            });
        }
        return res.status(200).json(`Supplier ${name} added successfully.`);
    }
);

router.post(
    '/changesupplierdata/:id',
    authAllUsersMiddleware,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);
        const {
            name,
            uid,
            vat,
            phoneNumber,
            contactPerson,
            emailAddress,
            startDate,
            endDate,
        } = req.body;

        try {
            const supplier = await Suppliers.findByPk(req.params.id);

            if (supplier == null)
                throw 'The supplier does not exist in the database';

            if (name != null) supplier.name = name;
            if (uid != null) supplier.uid = uid;
            if (vat != null) supplier.vat = vat;
            if (phoneNumber != null) supplier.phoneNumber = phoneNumber;
            if (contactPerson != null) supplier.contactPerson = contactPerson;
            if (emailAddress != null) supplier.emailAddress = emailAddress;
            if (startDate != null) supplier.startDate = startDate;
            if (endDate != null) supplier.endDate = endDate;

            await supplier.save();

            return res.status(201).json(supplier);
        } catch (err) {
            return res.status(400).json(err);
        }
    }
);

router.get('/getallsuppliers', authAllUsersMiddleware, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);
    const suppliers = await Suppliers.findAll();
    return res.status(200).json(suppliers);
});

module.exports = router;

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
