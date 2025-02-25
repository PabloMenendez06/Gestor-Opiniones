import { response, request } from "express";
import Coment from "./coment.model.js";
import Post from "../post/post.model.js";

export const createComent = async (req = request, res = response) => {
    try {
        const { content, post } = req.body;
        const userId = req.usuario._id;
        
        const existingPost = await Post.findById(post);
        if (!existingPost) {
            return res.status(404).json({
                success: false,
                msg: "Post not found"
            });
        }

        const coment = new Coment({ content, user: userId, post });
        await coment.save();

        res.status(201).json({
            success: true,
            msg: "Coment added successfully",
            coment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error adding coment"
        });
    }
};

export const updateComent = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.usuario._id;

        const coment = await Coment.findById(id);
        if (!coment) {
            return res.status(404).json({
                success: false,
                msg: "Coment not found"
            });
        }

        if (coment.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                msg: "You can only edit your own coments"
            });
        }

        coment.content = content;
        await coment.save();

        res.status(200).json({
            success: true,
            msg: "Coment updated successfully",
            coment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error updating coment"
        });
    }
};

export const deleteComent = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const userId = req.usuario._id;

        const coment = await Coment.findById(id);
        if (!coment) {
            return res.status(404).json({
                success: false,
                msg: "Coment not found"
            });
        }

        if (coment.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                msg: "You can only delete your own coments"
            });
        }

        await Coment.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            msg: "Coment deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error deleting coment"
        });
    }
};

export const listComentsByPost = async (req = request, res = response) => {
    try {
        const { postId } = req.params;

        const coments = await Coment.find({ post: postId }).populate("user", "username");

        res.status(200).json({
            success: true,
            coments
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error retrieving posts"
        });
    }
};