"use strict";
const jwt = require('jsonwebtoken');
const secret = "myjwtsecret";
let auth = {
    encode: (data) => jwt.sign({
      //  exp: Math.floor(Date.now() / 1000) + (60 * 1),
        user: data
    }, secret),
    decode: (req, res, next) => {
        const payload = jwt.verify(req.headers.token, secret);
        if (payload) {
            req.headers.user = payload.user;
            next();
            return;
        }
        res.status(404).send("Unauthorized")
    }
};

module.exports = auth;
