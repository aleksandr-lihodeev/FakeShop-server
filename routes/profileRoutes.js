import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import {getProfileController} from "../controllers/profile/getProfileController.js";
import {editProfileValidate} from "../validators/editProfileValidate.js";
import {errorsValidation} from "../middlewares/errorsValidation.js";
import {editProfileController} from "../controllers/profile/editProfileController.js";
import {deleteProfileController} from "../controllers/profile/deleteProfileController.js";

const router = express.Router();

router.get("/user", verifyToken, getProfileController);
router.patch(
    "/user-edit",
    verifyToken,
    editProfileValidate,
    errorsValidation,
    editProfileController
);
router.delete("/user-delete", verifyToken, deleteProfileController);

export default router;
