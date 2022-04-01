const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    productName : {
        type : String,
        requierd : true,
        unique : true
    },
    MRP : {
        type : Number,
        required : true
    },
    discountPercent : {
        type : Number,
        required : true
    },
    productType : {
        type : String,
        requierd : true
    },
    productImage : {
        type : String,
        required : true,
        unique : true
    }
});

module.exports = new mongoose.model("companyProduct" , userSchema);
