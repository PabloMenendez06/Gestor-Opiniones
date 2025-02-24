import { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxLength: [100, "Title can't exceed 100 characters"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
});

export default model("Post", PostSchema);