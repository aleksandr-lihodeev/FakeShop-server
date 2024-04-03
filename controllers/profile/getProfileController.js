import Auth from "../../models/Auth.js";

export const getProfileController = async (req, res) => {
    const user = await Auth.findById(req.user.userId).select("-hash_pass");
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send({ user });
};
