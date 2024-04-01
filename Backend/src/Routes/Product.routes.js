const Router = require("express")
const verifyToken = require('../Middlewares/Auth.middleware')
const {addProduct,updateProduct,deleteProduct,findAllProduct} = require('../Controllers/product.controllers')

const router = Router()

router.route("/addProduct").post(addProduct)
router.route("/updateProduct/:_id").put(updateProduct)
router.route("/deleteProduct/:_id").delete(deleteProduct)
router.route("/find").post(findAllProduct)
module.exports = router