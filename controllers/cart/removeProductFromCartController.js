import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import { countGrandTotal } from "../../helpers/helpers.js";
import { findPositionOfItem } from "../../helpers/helpers.js";

export const removeProductFromCartController = async (req, res) => {
    const { userId } = req.user;
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).send({ message: "Cart not found" });
        }

        const itemIndex = findPositionOfItem(cart.items, productId);

        if (itemIndex !== -1) {
            if (cart.items[itemIndex].quantity > 1) {
                cart.items[itemIndex].quantity -= 1;
                cart.items[itemIndex].total = cart.items[itemIndex].quantity * product.price;
            } else {
                cart.items = cart.items.filter(item => item.product != productId);

                if (cart.items.length === 0) {
                    await Cart.findOneAndDelete({ userId });
                    return res.status(200).send({ message: "Cart removed" });
                }
            }

            cart.grandTotal = countGrandTotal(cart.items, "total");
            await cart.save();

            return res.status(200).send({ message: "Product quantity updated in cart" });
        } else {
            return res.status(404).send({ message: "Product not found in cart" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Internal server error" });
    }
};
