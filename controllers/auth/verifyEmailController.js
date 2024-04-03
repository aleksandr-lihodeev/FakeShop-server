import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Auth from '../../models/Auth.js'

dotenv.config();
export const verifyEmailController = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Auth.findOneAndUpdate(
            { email: decoded.email },
            { verified: true },
            { new: true }
        );
        if (!user) {
            return res.status(404).send({ message: "User not defined" });
        }

        return res.redirect("http://localhost:3000");
    } catch (e) {
        return res.status(500).send("Internal Server Error");
    }
};
