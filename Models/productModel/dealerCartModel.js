const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    productName : String,
    MRP : Number,
    discountPrice : Number,
    Quantity : Number,
    productType : String,
    status : {
        type: String,
        enum: ['order_to_be_placed', 'dispatched', 'delivered'],
        default: 'order_to_be_placed'
    }
})

module.exports = new mongoose.model("dealerCart" , userSchema);
