import express from 'express'
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoritesRoutes from "./routes/favoritesRoutes.js";
import {fetchCocktails} from "./controllers/cart/refactorProducts.js";
import cocktailsRoutes from "./routes/cocktailsRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5050;
const corsOptions = {
    // origin: process.env.FRONTEND_URL,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/cart", cartRoutes);
app.use("/favorite", favoritesRoutes);
app.use("/cocktail", cocktailsRoutes)

app.get("/refactor-cocktails", async (req, res) => {
    try {
        await fetchCocktails();
        res.status(200).send({ message: "Cocktails were saved in DB" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log("Connect db success"))
    .catch((err) => console.error("Error connecting to MongoDB", err));

app.listen(port, () => {
    console.log("Server is running at localhost: " + port);
});