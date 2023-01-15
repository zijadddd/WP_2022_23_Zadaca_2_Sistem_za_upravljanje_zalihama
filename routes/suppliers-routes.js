const express = require('express');
const router = express.Router();
const { Suppliers } = require('../models');
const { validationResult } = require('express-validator');
const { addNewSupplier } = require('../validators/suppliers');
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
            phone_number,
            contact_person,
            email_address,
            start_date,
            end_date,
        } = req.body;

        const supplier = await Suppliers.create({
            name: name,
            uid: uid,
            vat: vat,
            phone_number: phone_number,
            contact_person: contact_person,
            email_address: email_address,
            start_date: start_date,
            end_date,
        });

        return res.status(200).json(supplier);
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
            phone_number,
            contact_person,
            email_address,
            start_date,
            end_date,
        } = req.body;

        try {
            const supplier = await Suppliers.findByPk(req.params.id);

            if (supplier == null)
                throw 'The supplier does not exist in the database';

            if (name != null) supplier.name = name;
            if (uid != null) supplier.uid = uid;
            if (vat != null) supplier.vat = vat;
            if (phone_number != null) supplier.phone_number = phone_number;
            if (contact_person != null)
                supplier.contact_person = contact_person;
            if (email_address != null) supplier.email_address = email_address;
            if (start_date != null) supplier.start_date = start_date;
            if (end_date != null) supplier.end_date = end_date;

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
    const suppliers = Suppliers.findAll();
    return res.status(200).json(suppliers);
});

module.exports = router;

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
