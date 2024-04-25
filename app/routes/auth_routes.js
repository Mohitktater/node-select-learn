const auth = require("../controllers/auth.controller.js");
var router = require('express').Router();


router.post("/verification", auth.tokenverification);


module.exports = router;

