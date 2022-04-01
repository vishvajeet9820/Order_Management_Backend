const express = require('express');
const multer = require('multer');

var storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename : function(req, file, cb) {
        var value = "REPRESENTATIVE"
        cb(null, Date.now() + "-" + file.originalname + "-" + value);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

var upload = multer({
    storage : storage,
    limits : {
        fileSize: 1024 * 1024 * 800
    },
    fileFilter : fileFilter
})

const controller1 = require('../Controllers/representativeImageController/representativeImageController')

router1 = express.Router();
router1.route("")

.post(upload.single('productImage') , (req , res) => {
    controller1.productDetailsEntry(req , res);
})


module.exports = router1;
