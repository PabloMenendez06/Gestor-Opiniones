import User from '../users/user.model.js';
import { hash, verify } from 'argon2';
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const lowerEmail = email ? email.toLowerCase() : null;
        const lowerUsername = username ? username.toLowerCase() : null;

        const user = await User.findOne({
            $or: [{ email: lowerEmail }, { username: lowerUsername }]
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                msg: 'Credenciales incorrectas, usuario no encontrado'
            });
        }

        if (!user.estado) {
            return res.status(400).json({
                success: false,
                msg: 'El usuario está inactivo'
            });
        }

        const validPassword = await verify(user.password, password);
        if (!validPassword) {
            return res.status(400).json({
                success: false,
                msg: 'La contraseña es incorrecta'
            });
        }

        const token = await generarJWT(user.id);

        return res.status(200).json({
            success: true,
            msg: 'Inicio de sesión exitoso',
            userDetails: {
                username: user.username,
                token: token,
            }
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            msg: "Error del servidor",
            error: e.message
        });
    }
};

export const register = async (req, res) => {
    try {
        const { name, surname, username, email, password } = req.body;

        const encryptedPassword = await hash(password);

        const user = await User.create({
            name,
            surname,
            username,
            email,
            password: encryptedPassword
        });

        return res.status(201).json({
            success: true,
            msg: "Usuario registrado exitosamente",
            userDetails: {
                user: user.email
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Error al registrar usuario",
            error: error.message
        });
    }
};