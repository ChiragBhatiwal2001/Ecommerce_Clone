const Address = require("../Models/address.model")
const ApiError = require("../Utils/ApiError")
const ApiResponse = require("../Utils/ApiResponse")

const registerAddress = async (req,resp) => {
    let user =  req.user
    const {userHouseNo,userCity,userLocality,userState,userPincode}= req.body
    if([userHouseNo,userCity,userLocality,userState,userPincode].some((fields)=>fields?.trim() === ""))
    {
        throw new ApiError(401,"All fields are required")
    }

    const address = await Address.create({
        userHouseNo,userCity,userLocality,userState,userPincode,
        userId:user
    })

    const data = await Address.findById(address._id)

    if(!data)
    {
        throw new ApiError(400,"Data not found")
    }

    resp.send(200)
    .json(new ApiResponse(200,data,"data submitted"))
}

module.exports = registerAddress;