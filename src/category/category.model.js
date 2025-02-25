import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Category name is required"]
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Category", CategorySchema);