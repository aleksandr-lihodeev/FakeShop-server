import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import { countGrandTotal } from "../../helpers/helpers.js";
import { findPositionOfItem } from "../../helpers/helpers.js";

export const addProductToCartController = async (req, res) => {
    const { userId } = req.user;
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) return res.status(404).send({ message: "Product not found" });
    const cart = await Cart.findOne({ userId });

    if (cart) {
        const itemIndex = findPositionOfItem(cart.items, productId);
        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity += 1;
            cart.items[itemIndex].total =
                cart.items[itemIndex].quantity * product.price;

            cart.grandTotal = countGrandTotal(cart.items, "total");

            await cart.save();
            return res
                .status(200)
                .send({ message: "Product quantity updated in cart" });
        } else {
            const newItem = {
                product: productId,
                total: product.price,
            };
            cart.items.push(newItem);
            cart.grandTotal = countGrandTotal(cart.items, "total");

            await cart.save();
            return res.status(200).send({ message: "Product added to cart" });
        }
    } else {
        const newCart = new Cart({
            userId,
            items: [{ product: productId, total: product.price }],
            grandTotal: product.price,
        });

        await newCart.save();
        return res.status(201).send({ message: "Product added to new cart" });
    }
};
