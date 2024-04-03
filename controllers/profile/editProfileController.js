import Auth from "../../models/Auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import upload from "../../aws/awsConfig.js";
import { deleteImageFromS3 } from "../../aws/awsDelete.js";

export const editProfileController = async (req, res) => {
    try {
        const uploadMiddleware = upload("avatar");
        uploadMiddleware.single("image")(req, res, async function (err) {
            if (err) {
                return res.status(500).send("Error uploading file");
            }

            const userId = req.user.userId;

            const user = await Auth.findById(userId);
            console.log(user);
            if (user.imageUrl) {
                const imageKey = new URL(user.imageUrl).pathname.split("/").pop();
                await deleteImageFromS3(imageKey, "avatar");
                await Auth.findByIdAndUpdate(userId, { imageUrl: "" });
            }

            const { name, email, newPassword } = req.body;
            const imageUrl = req.file ? req.file.location : null;

            console.log(req.body);

            if (!email && !name && !newPassword && !imageUrl)
                return res.status(404).send({ message: "required at least 1 field" });

            const updatedData = {};
            if (email) updatedData.email = email;
            if (name) updatedData.name = name;
            if (imageUrl) updatedData.imageUrl = imageUrl;
            if (newPassword) {
                updatedData.hash_pass = await bcrypt.hash(newPassword, 10);
            }
            const updatedUser = await Auth.findByIdAndUpdate(userId, updatedData, {
                new: true,
            });
            if (!updatedUser)
                return res.status(404).send({ message: "User not found" });

            const token = jwt.sign(
                { email: updatedUser.email, userId: updatedUser._id },
                process.env.JWT_SECRET,
            );

            res.status(200).send({
                updatedUser,
                token,
                message: "Profile update success",
            });
        });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
};
