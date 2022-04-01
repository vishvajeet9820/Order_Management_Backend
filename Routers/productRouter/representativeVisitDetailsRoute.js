const express = require('express');
const controller2 = require('../Controllers/productController/representativeVisitDetailsController')
router2 = express.Router();
router2.route("")
.get((req , res) => {
    controller2.productAddedDetails(req , res);
})
.post((req , res) => {
    controller2.productAdded(req , res);
})
.patch((req , res) => {
    controller2.increaseQuantity(req , res);
})

module.exports = router2;
