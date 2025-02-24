import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
    content: {
        type: String,
        required: [true, "Comment content is required"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Comment", CommentSchema);