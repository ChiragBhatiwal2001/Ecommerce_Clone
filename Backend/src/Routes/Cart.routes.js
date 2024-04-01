const {addToCart,deleteCartProduct,findProductInCart} = require("../Controllers/cart.controllers")
const Router = require("express")
const verifyJWT = require("../Middlewares/Auth.middleware")
const router = Router()

router.route("/addToCart/:_id").post(verifyJWT,addToCart)
router.route("/deleteCartItem/:_id").delete(deleteCartProduct)
router.route("/findCartItem").post(verifyJWT,findProductInCart)
module.exports = router
