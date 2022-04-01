const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    shopId : String,
    shopkeeper : String,
    shopName : String,
    productName : String,
    MRP : Number,
    discountPrice : Number,
    Quantity : Number,
    productType : String

})

module.exports = new mongoose.model("shopkeeperCart" , userSchema);
