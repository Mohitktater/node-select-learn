const products = require("../controllers/product.controller.js");
var router = require('express').Router();
const config = require('../config/config.js');
const verifyToken = require('../config/verify');



router.post("/create", verifyToken,  products.create);
router.get("/list", verifyToken, products.all_product_list);
router.get("/edit/:id", verifyToken, products.findOne);
router.post("/update/", verifyToken, products.update);
router.post("/delete/", verifyToken, products.delete);

module.exports = router;

