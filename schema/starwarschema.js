const mongoose = require("mongoose");

const starwar = new mongoose.Schema({
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

const starwardb = new mongoose.model("starwar", starwar);

module.exports = starwardb;