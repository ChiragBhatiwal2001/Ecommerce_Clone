const registerAddress = require("../Controllers/cart.controllers")
const Router = require("express")
const verifyJWT = require("../Middlewares/Auth.middleware")
const router = Router()

router.route("/register").post(verifyJWT,registerAddress)

module.exports = router