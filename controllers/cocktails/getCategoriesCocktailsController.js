import Product from "../../models/Product.js";

export const getCategoriesCocktailsController = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        res.status(200).send({
            categories
        });    } catch (e) {
        console.error(e);
        res.status(500).send("Internal Server Error");
    }
};
