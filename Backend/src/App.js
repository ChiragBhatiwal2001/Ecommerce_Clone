const express = require("express")
const registerController = require('./Routes/User.routes')
const productRouter = require('./Routes/Product.routes')
const addressRouter = require("./Routes/Address.routes")
const cartRouter = require('./Routes/addToCart.routes')
const app = express();
const cookieparser = require('cookie-parser')

app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({extended:true}))

app.use("/api",registerController)
app.use("/api/product",productRouter)
app.use("/cart",cartRouter)
app.use("/address",addressRouter)
module.exports = app
