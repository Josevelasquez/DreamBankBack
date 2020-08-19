const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");

// routing
const router = express.Router();

router.get("/", function (req, res) {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((err) => {
      response.error(req, res, err.message, 500);
    });
});

router.get("/:id", function (req, res) {
  Controller.get(req.params.id)
  .then((user) => {
    response.success(req,res,user,200)
  })
  .catch((err) => {
    response.error(req, res, err, 500);
  });
});

module.exports = router;
