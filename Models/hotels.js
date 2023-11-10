const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name:{
        type:String
    },
    hotels:{
        type:mongoose.Schema.Types.Mixed
    }
})

const Hotel = mongoose.model("Hotel",hotelSchema)

module.exports = Hotel;