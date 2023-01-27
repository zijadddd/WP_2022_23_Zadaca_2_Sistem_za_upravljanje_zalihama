const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { Users } = require('../models');
const { Employees } = require('../models');
const { registerEmployeeValidator } = require('../validators/employees.js');
const { loginUserValidator } = require('../validators/users.js');
const { validationResult } = require('express-validator');
const { authAdminMiddleware } = require('../middlewares/auth-middleware');

router.post(
    '/register',
    authAdminMiddleware,
    registerEmployeeValidator,
    async (req, res) => {
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
        let username = firstName.toLowerCase() + '_' + lastName.toLowerCase();
        let hash = await bcrypt.hash(password, 10);

        const employee = await Employees.create({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            address: address,
            emailAddress: emailAddress,
            dateOfEmployment: dateOfEmployment,
            dateOfCancellation: dateOfCancellation,
        });

        await Users.create({
            username: username,
            password: hash,
            role: role,
            employeeId: employee.id,
        });
        return res
            .status(201)
            .json(`Employee ${firstName} ${lastName} added successfully.`);
    }
);

router.post('/login', loginUserValidator, async (req, res) => {
    const { username, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json();
    }

    const user = await Users.findOne({ where: { username: username } });
    if (user == null)
        return res.status(400).json('User not exist in database!');

    const employee = await Employees.findOne({
        where: { id: user.employeeId },
    });
    if (employee.dateOfCancellation != null)
        return res
            .status(401)
            .json(
                `User with username ${user.username} is no longer an Employee.`
            );

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        const token = sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            process.env.SECRET
        );

        return res.status(200).json({
            accessToken: token,
        });
    }
    return res.status(401).json();
});

module.exports = router;

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
