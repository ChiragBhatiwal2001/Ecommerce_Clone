const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type:String,
        required:true
    },
    productShortDesc:{
        type:String,
        required:true
    },
    productRichDesc:{
        type:String
    },
    productImage:{
        type:String
    },
    productPublisherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

module.exports = mongoose.model("Product",productSchema)