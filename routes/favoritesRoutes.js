import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import {addToFavoriteController} from "../controllers/favorite/addToFavoriteController.js";
import {getFavoritesController} from "../controllers/favorite/getFavoritesController.js";

const router = express.Router();

router.post(
    "/toggle-favorite/:productId",
    verifyToken,
    addToFavoriteController
);
router.get("/get-favorites", verifyToken, getFavoritesController);

export default router;
