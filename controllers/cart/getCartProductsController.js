import Cart from "../../models/Cart.js";

export const getCartProductsController = async (req, res) => {
    const { userId } = req.user;
    const cart = await Cart.findOne({ userId }).populate("items.product");
    res.status(200).send(cart);
};
