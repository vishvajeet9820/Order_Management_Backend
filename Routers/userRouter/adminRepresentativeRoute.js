const express = require('express');
const controller2 = require('../Controllers/userController/adminRepresentativeController')
router2 = express.Router();
router2.route("")

.post((req , res) => {
    controller2.userAdded(req , res);
})


module.exports = router2;
