const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Users } = require('../models');
const { Employees } = require('../models');
const { validationResult } = require('express-validator');
const { changeUserPasswordValidator } = require('../validators/users.js');
const { authAdminMiddleware } = require('../middlewares/auth-middleware');

router.post(
    '/changepassword',
    authAdminMiddleware,
    changeUserPasswordValidator,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);
        const { id, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = await Users.findOne({ where: { zaposlenikId: id } });
        user.password = hash;
        await user.save();
        return res.status(204).json();
    }
);

router.post('/changeuserdata/:id', authAdminMiddleware, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.errors[0]);
    const {
        ime,
        prezime,
        broj_telefona,
        adresa,
        email_adresa,
        datum_zaposlenja,
        datum_otkaza,
        sifra,
        uloga,
    } = req.body;

    try {
        const employee = await Employees.findByPk(req.params.id);
        const user = await Users.findOne({
            where: { zaposlenikId: employee.id },
        });

        if (employee == null || user == null)
            throw 'User not exist in database!';

        if (ime != null) employee.ime = ime;
        if (prezime != null) employee.prezime = prezime;
        let username =
            employee.ime.toLowerCase() + '_' + employee.prezime.toLowerCase();
        if (broj_telefona != null) employee.broj_telefona = broj_telefona;
        if (adresa != null) employee.adresa = adresa;
        if (email_adresa != null) employee.email_adresa = email_adresa;
        if (datum_zaposlenja != null)
            employee.datum_zaposlenja = datum_zaposlenja;
        if (datum_otkaza != null) employee.datum_otkaza = datum_otkaza;
        if (username != null) user.username = username;
        if (sifra != null) {
            let hash = await bcrypt.hash(sifra, 10);
            user.sifra = hash;
        }
        if (uloga != null) user.uloga = uloga;

        await employee.save();
        await user.save();

        return res.status(201).json();
    } catch (err) {
        return res.status(400).json(err);
    }
});

module.exports = router;
