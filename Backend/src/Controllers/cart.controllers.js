const cartModel = require("../Models/cart.models")
const productModel = require("../Models/product.models")
const ApiError = require("../Utils/ApiError")
const ApiResponse = require("../Utils/ApiResponse")


const addToCart = async (req, resp) => {
    const user = req.user
    if (!user) {
        throw new ApiError(400, "user not found")
    }
   
    const product = await productModel.findById(req.params._id)

    if (!product) {
        throw new ApiError(400, "product not Found")
    }

    const productData = await cartModel.create({
        publisherId: user,
        productId: product
    })

    const data = await cartModel.findById(productData._id)

    if (!data) {
        throw new ApiError(400, "data not found")
    }

    resp.status(200)
    .json(new ApiResponse(201,data,"data of product is saved"))
}

const findProductInCart = async(req,resp) => {
    const publisherId = req.user
    if(!publisherId)
    {
        throw new ApiError(400,"user not found")
    }

    const product = await cartModel.find({$or:[{"publisherId":publisherId}]}).populate("productId")

    if(!product)
    {
        throw new ApiError(400,"no products found")
    }

   
    
    resp.status(200)
    .json(new ApiResponse(201,product,"fetching all products"))
}

const deleteCartProduct = async(req,resp) => {
    const product = await cartModel.findByIdAndDelete(req.params._id)
    
    if(!product)
    {
        throw new ApiError(400,"Error while deleting products")
    }

    resp.status(200)
    .json(new ApiResponse(201,product,"Data deleted succesfully"))
}

module.exports ={ addToCart,deleteCartProduct,findProductInCart}