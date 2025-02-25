import { response } from "express";
import Post from "./post.model.js";

export const createPost = async (req, res = response) => {
    try {
        const { title, category, content } = req.body;
        const userId = req.usuario._id;

        const newPost = new Post({
            title,
            category,
            content,
            user: userId
        });

        await newPost.save();

        res.status(201).json({
            success: true,
            msg: "Post created successfully",
            post: newPost
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error creating post",
            error
        });
    }
};

export const updatePost = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { title, category, content } = req.body;
        const userId = req.usuario._id;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                msg: "Post not found"
            });
        }

        if (post.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                msg: "You can only edit your own posts"
            });
        }

        post.title = title || post.title;
        post.category = category || post.category;
        post.content = content || post.content;

        await post.save();

        res.status(200).json({
            success: true,
            msg: "Post updated successfully",
            post
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error updating post",
            error
        });
    }
};

export const deletePost = async (req, res = response) => {
    try {
        const { id } = req.params;
        const userId = req.usuario._id;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                success: false,
                msg: "Post not found"
            });
        }

        if (post.user.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                msg: "You can only delete your own posts"
            });
        }

        await post.deleteOne();

        res.status(200).json({
            success: true,
            msg: "Post deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error deleting post",
            error
        });
    }
};

export const getUserPosts = async (req, res = response) => {
    try {
        const userId = req.usuario._id;

        const posts = await Post.find({ user: userId });

        res.status(200).json({
            success: true,
            posts
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error retrieving posts",
            error
        });
    }
};