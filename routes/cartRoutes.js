import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import {addProductToCartController} from "../controllers/cart/addProductToCartController.js";
import {getCartProductsController} from "../controllers/cart/getCartProductsController.js";
import {removeProductFromCartController} from "../controllers/cart/removeProductFromCartController.js";

const router = express.Router();

router.post("/add-to-cart/:productId", verifyToken, addProductToCartController);
router.post("/remove-from-cart/:productId", verifyToken, removeProductFromCartController);
router.get("/get-cart-products", verifyToken, getCartProductsController);

export default router;
