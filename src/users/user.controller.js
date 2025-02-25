import { response } from "express";
import { hash, verify } from "argon2";
import User from "./user.model.js";

export const updateUser = async (req, res = response) => {
    try {
        const userId = req.usuario._id;
        const { password, newPassword, ...data } = req.body;

        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        data.email = existingUser.email;

        if (newPassword) {
            if (!password) {
                return res.status(400).json({
                    success: false,
                    msg: "You must enter your current password to change it",
                });
            }

            const isMatch = await verify(existingUser.password, password);
            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    msg: "Current password is incorrect",
                });
            }

            data.password = await hash(newPassword);
        }

        const user = await User.findByIdAndUpdate(userId, data, { new: true });

        res.status(200).json({
            success: true,
            msg: "User updated successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error updating user",
            error,
        });
    }
};

export const getUserProfile = async (req, res = response) => {
    try {
        const user = await User.findById(req.usuario._id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error retrieving user profile",
            error,
        });
    }
};