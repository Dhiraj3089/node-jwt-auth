"use strict"
const express = require('express');
const router = express.Router();
const Auth = require('../auth/jwt_auth');
const User = require('../controller/user_controller');

router.post('/verifyToken', Auth.decode, (req, res) => {
    if (req.headers.user) {
        res.send({ data: "valid" });
    } else {
        res.status(500).send("invalid");
    }
});

router.post('/login', (req, res) => {
    try {
        let user = new User(null);
        let userData = user.verifyUser(req.body.username, req.body.password)
        let token = null;
        if (userData) {
            token = Auth.encode({ user_id: userData.user_id });
            userData["token"] = token;
            res.send(userData);
        } else {
            res.status(404).send("Unauthorized");
        }
    } catch (error) {
        res.status(404).send("Invalid Username/Password");
    }
});

router.get('/details', Auth.decode, (req, res) => {
    try {
        let userData = null
        let user = new User(req.headers.user.user_id)
        userData = user.getUserDetails();
        res.send(userData);
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;