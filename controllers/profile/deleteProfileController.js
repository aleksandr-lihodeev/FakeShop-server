import Auth from "../../models/Auth.js";
import Favorite from "../../models/Favorite.js";
import Cart from "../../models/Cart.js";
import { deleteImageFromS3 } from "../../aws/awsDelete.js";

export const deleteProfileController = async (req, res) => {
    try {
        const userId = req.user.userId;

        await Favorite.findOneAndDelete({ userId });

        await Cart.findOneAndDelete({ userId });

        const user = await Auth.findById(userId);
        if (user.imageUrl) {
            const imageKey = new URL(user.imageUrl).pathname.split("/").pop();
            await deleteImageFromS3(imageKey, "avatar");
        }

        await Auth.findByIdAndDelete(userId);

        res.status(200).send({ message: "User deleted successfully" });
    } catch (e) {
        console.error("Error deleting user:", e);
        res
            .status(500)
            .send({ message: "Internal Server Error", error: e.message });
    }
};
