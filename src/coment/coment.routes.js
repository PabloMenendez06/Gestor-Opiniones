import { Router } from "express";
import { check } from "express-validator";
import { createComent, updateComent, deleteComent, listComentsByPost } from "./coment.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { existingPost, existingComent } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check("content", "Coment content is required").not().isEmpty(),
        check("post", "Invalid post ID").isMongoId(),
        check("post").custom(existingPost),
        validarCampos
    ],
    createComent
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid coment ID").isMongoId(),
        check("id").custom(existingComent),
        check("content", "Coment content is required").not().isEmpty(),
        validarCampos
    ],
    updateComent
);

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "Invalid coment ID").isMongoId(),
        check("id").custom(existingComent),
        validarCampos
    ],
    deleteComent
);

router.get("/post/:postId", 
    [
        check("postId", "Invalid post ID").isMongoId(),
        check("postId").custom(existingPost),
        validarCampos
    ], 
    listComentsByPost
);

export default router;