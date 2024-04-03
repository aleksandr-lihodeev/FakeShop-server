import Product from "../../models/Product.js";
export const getCocktailsController = async(req,res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = req.query.pageSize || 10;
    const searchQuery = req.query.search || "";
    const category = req.query.category || "";
    try {
        const query = {};

        if (searchQuery) {
            query.name = { $regex: searchQuery, $options: "i" };
        }

        if (category) {
            query.category = category;
        }


        const total = await Product.countDocuments(query);
        const pages = Math.ceil(total / pageSize);
        const product = await Product.find(query)
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        res.status(200).send({
            pages,
            product,
        });
    }catch (e) {
        res.status(500).send("Internal Server Error")
    }
}