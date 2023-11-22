const mongoose = require("mongoose");

const action_row = new mongoose.Schema({
    movies_title : {
        type: String,
        required:true
    },
    desc: {
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
    rating:{
        type: Number,
        required:true,
    },
    poster:{
        type:String,
        required:true,
    },
    reviews:{
        type:Map,
        of: String,
    },
    ratings:{
        type:Map,
        of: String,
    }
})

const actionrowdb = new mongoose.model("action_row", action_row);

module.exports = actionrowdb;