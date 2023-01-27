const { verify } = require('jsonwebtoken');

const authAdminMiddleware = async (req, res, next) => {
    const token = req.header('access-token').split('Bearer ')[1];
    if (!token) return res.status(401).json();
    try {
        var payload = await verify(token, process.env.SECRET);
        req.user = payload;
        if (req.user.role !== 'Admin') throw 'You are not authorised.';
        next();
    } catch (err) {
        return res.status(401).json(err);
    }
};

const authAllUsersMiddleware = async (req, res, next) => {
    const token = req.header('access-token').split('Bearer ')[1];
    if (!token) return res.status(401).json();
    try {
        var payload = await verify(token, process.env.SECRET);
        req.user = payload;
        if (req.user.role !== 'Admin')
            if (req.user.role !== 'Employee') throw 'You are not authorised.';
        next();
    } catch (err) {
        return res.status(401).json(err);
    }
};

module.exports = {
    authAdminMiddleware,
    authAllUsersMiddleware,
};

// UNZE PTF SI WP 2022/2023 :: ZIJAD DOGLOD
