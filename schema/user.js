const mongoose = require("mongoose");

const user_details = new mongoose.Schema({
    UserNAME : {
        type: String,
        required:true
    },
    UserEMAIL:{
        type:String,
        required:true,
        unique: true,
    },
    UserPASS: {
        type: String,
        required: true,
    },
    Wishlist: {
        type: Array,
        required :true,
        unique: true,
    }
})

const userdb = new mongoose.model("user_detail", user_details);

module.exports = userdb;