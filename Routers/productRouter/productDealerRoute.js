const express = require('express');
const controller1 = require('../Controllers/productController/productDealerController')
router1 = express.Router();
router1.route("")
.get((req , res) => {
    controller1.productDetails(req , res);
})
.post((req , res) => {
    controller1.productDetailsEntry(req , res);
})
.patch((req,res) => { 
    controller1.productQuantityUpdate(req , res);
})

module.exports = router1;
