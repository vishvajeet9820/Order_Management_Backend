const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    shopId : {
        type : String,
        unique : true
    },
    shopkeeperName : String,
    shopName : String,
    address : String,
    contact : Number,
    addedBy: {
        type: String,
        enum: ['ADMIN' , 'REPRESENTATIVE'],
    }
});

module.exports = new mongoose.model("shopkeeper_list" , userSchema);
