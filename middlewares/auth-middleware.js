const { verify } = require('jsonwebtoken');

const authAdminMiddleware = async (req, res, next) => {
    const token = req.header('access-token').split('Bearer ')[1];
    if (!token) return res.status(401).json();
    try {
        var payload = await verify(token, process.env.SECRET);
        req.user = payload;
        if (req.user.uloga !== 'Admin')
            return res.status(401).json('You are not authorised.');
        next();
    } catch (err) {
        return res.status(401).json();
    }
};

const authAllUsersMiddleware = async (req, res, next) => {
    const token = req.header('access-token').split('Bearer ')[1];
    if (!token) return res.status(401).json();
    try {
        var payload = await verify(token, process.env.SECRET);
        req.user = payload;
        if (req.user.uloga !== 'Admin' || req.user.uloga !== 'Zaposlenik')
            return res.status(401).json('You are not authorised.');
        next();
    } catch (err) {
        return res.status(401).json();
    }
};

module.exports = {
    authAdminMiddleware,
    authAllUsersMiddleware,
};
