const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({

     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     productId:{
      type:String,
      ref:"Product"
     },
    
      
},{timestamps:true})

module.exports = mongoose.model("Cart",cartSchema)