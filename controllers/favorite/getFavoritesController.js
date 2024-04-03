import Favorite from "../../models/Favorite.js";
export const getFavoritesController = async (req, res) => {
    const { userId } = req.user;
    const cart = await Favorite.findOne({ userId }).populate("items.product");
    res.status(200).send(cart);
};
