import express from "express";
import {getCocktailsController} from "../controllers/cocktails/getCocktailsController.js";
import {getCategoriesCocktailsController} from "../controllers/cocktails/getCategoriesCocktailsController.js";

const router = express.Router();

router.get("/get-all-products",  getCocktailsController);
router.get("/get-category-products", getCategoriesCocktailsController)
export default router;
