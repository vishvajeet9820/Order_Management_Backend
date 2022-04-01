const express = require('express');
const controller3 = require('../Controllers/productController/totalShopkeeperController')
router3 = express.Router();
router3.route("")
.get((req , res) => {
    controller3.totalBill(req , res);
})


module.exports = router3;
