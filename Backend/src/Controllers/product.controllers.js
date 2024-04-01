const Product = require("../Models/product.models")
const ApiError = require("../Utils/ApiError")
const ApiResponse = require("../Utils/ApiResponse")

const addProduct = async(req,resp) => {
    const {productName,productPrice,productShortDesc,productRichDesc, productSize, productCategory,productInStock} = req.body

    if([productName,productPrice,productShortDesc,productRichDesc,productSize, productCategory,productInStock].some((fields)=>fields?.trim() === ""))
    {
        throw new ApiError(400,"All fields are required")
    }
    const productPublisherId = req.user._id
    const productImage = req.file?.path
    console.log( req.file?.path)
    if(!productImage)
    {
        throw new ApiError(400,"Image Required")
    }

    const product = await Product.create({
        productName,productPrice,productShortDesc,productRichDesc,productImage,
        productSize, productCategory,productInStock ,productPublisherId
       
    })
  
    

    resp.status(200)
    .json(new ApiResponse(200,product,"Product Saved"))
}

const updateProduct = async(req,resp) => {
    const productImage = req.file?.path
    console.log( req.file?.path)
    if(!productImage)
    {
        throw new ApiError(400,"Image Required")
    }
    const product = await Product.findByIdAndUpdate(
        req.params._id,
        {
            $set:{
                productName:req.body.productName,
                productRichDesc:req.body.productRichDesc,
                productShortDesc:req.body.productShortDesc,
                productPrice:req.body.productPrice,
                productImage:productImage,
                productCategory:req.body.productCategory,
                productInStock:req.body.productInStock,
                productSize:req.body.productSize
            }              
            
        },
        {
            new :true
        }
     )

     if(!product)
     {
        throw new ApiError(400,"Problem in Updating")
     }
    
     resp.status(200)
     .json(new ApiResponse(201,product,"Upated Successfully"))

}

const deleteProduct = async (req,resp) => {
    const product = await Product.findByIdAndDelete(req.params._id)

    if(!product)
    {
        throw new ApiError(400,"Didn't get Product")
    }

    resp.status(200)
    .json(new ApiResponse(200,product,"Product Delete Successful"))
}

const findAllProduct = async(req,resp) => {
    const product = await Product.find()

    if(!product)
    {
        throw new ApiError(400,"Didn't get Product")
    }

    resp.status(200)
    .json(new ApiResponse(200,product,"Got all product"))
}

const findProductWithSearch = async (req,resp) => {
    const product = await Product.findById(
         req.params._id
    )
    if(!product)
    {
        throw new ApiError(400,"Can't find")
    }

    resp.status(200)
    .json(new ApiResponse(200,product,"Found product"))
}
  
const findProductWithParmeters = async (req,resp) => {
    const data = req.params.name
    if(!data){
        throw new ApiError(404,"Something went wrong")
    }
    const searchedProduct =  await Product.find({
        
        "$or":[{"productName":{$regex:data}},{"productShortDesc":{$regex:data}}]
     } )

     if(!searchedProduct)
     {
        throw new ApiError(404,"Data not found")
     }

     resp.status(200)
     .json(new ApiResponse(201,searchedProduct,"Data Found"))
}

module.exports = {addProduct,updateProduct,deleteProduct,findAllProduct,findProductWithSearch,findProductWithParmeters}