import { Schema, model } from "mongoose";

const ComentSchema = new Schema({
    content: {
        type: String,
        required: [true, "Coment content is required"]
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

export default model("Coment", ComentSchema);