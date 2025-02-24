import { Router } from "express";
import { check } from "express-validator";
import { createCategory, updateCategory, deleteCategory, listCategories } from "./category.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { tieneRole } from "../middlewares/validar-roles.js";
import { existingCategory } from "../helpers/db-validator.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        tieneRole("ADMIN"),
        check("name", "Category name is required").not().isEmpty(),
        validarCampos
    ],
    createCategory
);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN"),
        check("id", "Invalid ID").isMongoId(),
        check("id").custom(existingCategory),
        check("name", "Category name is required").not().isEmpty(),
        validarCampos
    ],
    updateCategory
);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole("ADMIN"),
        check("id", "Invalid ID").isMongoId(),
        check("id").custom(existingCategory),
        validarCampos
    ],
    deleteCategory
);

router.get("/", listCategories);

export default router;