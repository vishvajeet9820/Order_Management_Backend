const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    productName : {
        type : String,
        requierd : true,
        unique : true
    },
    MRP : {
        type : Number,
        requierd : true
    },
    discountPercent : {
        type : Number,
        requierd : true
    },
    quantity_InStock : {
        type : Number,
        requierd : true
    },
    productType : String,
    productImage : {
        type : String,
        required : true,
        unique : true
    }
})

module.exports = new mongoose.model("dealerProduct" , userSchema);
