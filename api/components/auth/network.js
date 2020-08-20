const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

// routing
const router = express.Router();

router.post('/login', function(req, res) {
    Controller.login(req.body.username, req.body.password)
    .then((token) => {
        response.success(req, res, token, 200);
    })
    .catch((err) => {
        response.error(req, res, 'username or password incorrect', 401)
    })
});

module.exports = router;