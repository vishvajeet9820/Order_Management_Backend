const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    shopId : String,
    shopkeeper : String,
    shopName : String,
    noOfVisit : Number,
    totalNoOfProd : Number,
    amountToBePaid : Number

})

module.exports = new mongoose.model("visit_Details" , userSchema);
