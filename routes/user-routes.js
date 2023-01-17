const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require('../models');
const { Employees } = require('../models');
const { validationResult } = require('express-validator');
const { changeUserPasswordValidator } = require('../validators/users.js');
const { authAdminMiddleware } = require('../middlewares/auth-middleware');

router.post(
    '/changepassword/:id',
    authAdminMiddleware,
    changeUserPasswordValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);
        const { password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await Users.findOne({
            where: { employeeId: req.params.id },
        });
        if (user == null)
            return res
                .status(400)
                .json('The user does not exist in the database!');
        user.password = hash;
        await user.save();
        return res.status(204).json('Password changed successfully');
    }
);

router.post('/changeuserdata/:id', authAdminMiddleware, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);
    const {
        firstName,
        lastName,
        phoneNumber,
        address,
        emailAddress,
        dateOfEmployment,
        dateOfCancellation,
        password,
        role,
    } = req.body;

    try {
        const employee = await Employees.findByPk(req.params.id);
        const user = await Users.findOne({
            where: { employeeId: employee.id },
        });

        if (employee == null || user == null)
            throw 'The user does not exist in the database!';

        if (firstName != null) employee.firstName = firstName;
        if (lastName != null) employee.lastName = lastName;
        let username =
            employee.firstName.toLowerCase() +
            '_' +
            employee.lastName.toLowerCase();
        if (phoneNumber != null) employee.phoneNumber = phoneNumber;
        if (address != null) employee.address = address;
        if (emailAddress != null) employee.emailAddress = emailAddress;
        if (dateOfEmployment != null)
            employee.dateOfEmployment = dateOfEmployment;
        if (dateOfCancellation != null)
            employee.dateOfCancellation = dateOfCancellation;
        if (username != null) user.username = username;
        if (password != null) {
            let hash = await bcrypt.hash(password, 10);
            user.password = hash;
        }
        if (role != null) user.role = role;

        await employee.save();
        await user.save();

        return res.status(201).json();
    } catch (err) {
        return res.status(400).json(err);
    }
});

module.exports = router;

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
