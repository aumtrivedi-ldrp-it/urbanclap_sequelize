const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "secretkey23456";
const user = require("../models").User;

exports.auth = async (req, res, next) => {
    try {
        const userData = await jwt.verify(req.headers.authorization, SECRET_KEY)
        req.user = await user.findOne({
            where: {
                id: userData.id.id
            }
        });
        if (!req.user || !userData) {
            res.send("invalid tokens")
        }
        req.authId = req.user.id;
        req.authToken = req.user.tokens;
        next()
    }
    catch (err) {
        res.send(err)
    }

}