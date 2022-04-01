const express = require('express');

const controller1 = require('../Controllers/productController/productCompanyController')

router1 = express.Router();
router1.route("")
.get((req , res) => {
    controller1.productDetails(req , res);
})
.post((req , res) => {
    controller1.productDetailsEntry(req , res);
})


module.exports = router1;
