const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    representativeId : {
        type : String,
        unique : true
    },
    representativeName : String,
    contact : Number
});

module.exports = new mongoose.model("representative_list" , userSchema);
