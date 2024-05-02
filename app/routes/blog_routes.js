const blog_category = require("../controllers/blog_category.controller.js");
const blog_tag = require("../controllers/blog_tag.controller.js");

var router = require('express').Router();
const verifyToken = require('../config/verify');

router.post("/category/create", verifyToken, blog_category.create);
router.get("/category/list", verifyToken, blog_category.all_list);
router.get("/category/listall", verifyToken, blog_category.list_table);
router.get("/category/single", verifyToken, blog_category.single_details);
router.post("/category/update", verifyToken, blog_category.single_update);
router.post("/category/delete", verifyToken, blog_category.single_delete);


router.post("/tag/create", verifyToken, blog_tag.create);
router.get("/tag/listall", verifyToken, blog_tag.list_table);
router.get("/tag/single", verifyToken, blog_tag.single_details);
router.post("/tag/update", verifyToken, blog_tag.single_update);
router.post("/tag/delete", verifyToken, blog_tag.single_delete);

 
//router.get("/list", products.all_product_list);
//router.get("/edit/:id", products.findOne);
//router.post("/update/", products.update);
//router.post("/delete/", products.delete);


module.exports = router;

