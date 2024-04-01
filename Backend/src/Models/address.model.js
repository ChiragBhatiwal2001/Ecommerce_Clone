const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    userHouseNo: {
        type: String,
        required: true
    },
    userLocality: {
        type: String,
        required: true
    },
    userCity: {
        type: String,
        required: true
    },
    userState: {
        type: String,
        required: true
    },
    userPincode: {
        type: String,
        required: true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

}, { timestamps: true })

module.exports = mongoose.model("Address", addressSchema)