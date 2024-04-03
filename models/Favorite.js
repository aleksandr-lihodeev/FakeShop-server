import { Schema, model } from "mongoose";

const favoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        require: true,
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
        },
    ],
});

export default model("Favorite", favoriteSchema);
