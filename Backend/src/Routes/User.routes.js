const {registerUser,loginUser,logout} = require("../Contollers/UserController")
const Router =require("express")
const verifyToken = require("../Middlewares/authMiddleware")
const router = Router()

router.route("/register-user").post(registerUser)
router.route("/login-user").post(loginUser)
router.route("/logout").post(verifyToken,logout)

module.exports = router