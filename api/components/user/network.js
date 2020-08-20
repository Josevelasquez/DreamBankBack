const express = require("express");
const secure = require("./secure");
const response = require("../../../network/response");
const Controller = require("./index");

// routing
const router = express.Router();
router.get("/getAllProductByClient", getAllProductByClient);
router.get("/getDetailProduct", getDetailProduct);
router.post("/createProduct", secure("createProduct"), createProduct);
router.post("/", createUsername);

// Internal functions

function getAllProductByClient(req, res, next) {
  Controller.getAllProductByClient(req.body.clpr_idClient)
    .then((clientProducts) => {
      response.success(req, res, clientProducts, 200);
    })
    .catch(next);
}

function getDetailProduct(req, res, next) {
  Controller.getDetailProduct(req.body.idNumberAccount)
    .then((product) => {
      response.success(req, res, product, 200);
    })
    .catch(next);
}

function createProduct(req, res, next) {
  Controller.createProduct(req.body)
    .then((product) => {
      response.success(req, res, "Product", 201);
    })
    .catch(next);
}

function createUsername(req, res, next) {
  Controller.createUsername(req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
}

module.exports = router;
