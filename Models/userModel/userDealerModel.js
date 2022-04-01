const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    dealerId : {
        type : String,
        unique : true
    },
    dealerName : String,
    contact : Number
});


module.exports = new mongoose.model("dealer_list" , userSchema);
