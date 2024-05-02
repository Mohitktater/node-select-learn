const users = require("../controllers/user.controller.js");
var router = require('express').Router();


router.post("/create", users.create);
router.post("/login", users.login);
//router.get("/list", products.all_product_list);
//router.get("/edit/:id", products.findOne);
//router.post("/update/", products.update);
//router.post("/delete/", products.delete);


module.exports = router;

