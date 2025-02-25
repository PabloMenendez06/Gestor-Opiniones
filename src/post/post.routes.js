import { Router } from "express";
import { check } from "express-validator";
import { createPost, updatePost, deletePost, getUserPosts } from "../post/post.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existingPost } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("title", "The title is required").not().isEmpty(),
        check("category", "The category is required").not().isEmpty(),
        check("content", "The content is required").not().isEmpty(),
        validarCampos,
    ],
    createPost
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid ID").isMongoId(),
        check("id").custom(existingPost),
        validarCampos,
    ],
    updatePost
);

router.get(
    "/my-posts",
    validarJWT,
    getUserPosts
);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid ID").isMongoId(),
        check("id").custom(existingPost),
        validarCampos,
    ],
    deletePost
);

export default router;