const Cart = require("../Models/cart.models")
const User = require('../Models/user.models')
const ApiError = require('../Utils/ApiError')
const ApiResponse = require('../Utils/ApiResponse')

const generateRefreshandAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const refreshToken = await user.generateRefreshToken()
        const accessToken = await user.generateAccessToken()

        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false })

        return { refreshToken, accessToken }
    } catch (error) {
        throw new ApiError(400, "can't generate refersh Token")
    }

}

const registerUser = async (req, resp) => {
    const { username, password, email } = req.body

    if ([username, password, email].some((fields) => fields?.trim() === "")) {
        throw new ApiError(400, "required all fields")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(400, 'User already Exists')
    }

    const user = await User.create({
        username,
        password,
        email
    })

    const findUser = await User.findById(user._id)

    if (!findUser) {
        throw new ApiError(400, "User Not found")
    }

    const cart = await Cart(user._id)
    const cartCreated = await cart.save()

    resp.status(200)
        .json(new ApiResponse(201, data = { user, cartCreated }, "User created Successfully"))
}

const loginUser = async (req, resp) => {
    const { username, password } = req.body

    if ([username, password].some((fields) => fields?.trim() === "")) {
        throw new ApiError(400, "All fields required")
    }

    const userExists = await User.findOne({ username })

    if (!userExists) {
        throw new ApiError(400, "User not found")
    }

    const PasswordCorrect = await userExists.isPasswordCorrect(password)

    if (!PasswordCorrect) {
        throw new ApiError(400, "Password Not Correct")
    }

    const { refreshToken, accessToken } = await generateRefreshandAccessToken(userExists._id)

    const user = await User.findById(userExists._id).select('-password -refreshToken')

    const Options = {
        httpOnly: true,
        secure: true
    }

    resp.status(200)
        .cookie('AccessToken', accessToken, Options)
        .cookie('RefreshToken', refreshToken, Options)
        .json(new ApiResponse(201, data = { user, refreshToken, accessToken }, "User Logged In"))
}

//TODO
const logoutUser = async (req, resp) => {

    const data = await User.findById(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }

        },
        {
            new: true
        }
    )

    const Options = {
        httOnly: true,
        secure: true
    }

    resp.status(201)
        .clearCokkie("AccessToken", Options)
        .clearCookie("RefreshToken", Options)
        .json(new ApiResponse(200, {}, "User Logout Successfully"))

}

module.exports = { registerUser, loginUser, logoutUser }