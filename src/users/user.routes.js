import { Router } from "express";
import { updateUser, getUserProfile } from "./user.controller.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

router.put(
    "/edit",
    [
        validarJWT, 
        validarCampos
    ],
    updateUser
);

router.get(
    "/profile",
    [
        validarJWT
    ],
    getUserProfile
);

export default router;