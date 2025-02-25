import { response, request } from "express";
import Category from "./category.model.js";

export const createCategory = async (req = request, res = response) => {
    try {
        const { name } = req.body;

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                msg: "Category already exists"
            });
        }

        const category = new Category({ name });
        await category.save();

        res.status(201).json({
            success: true,
            msg: "Category created successfully",
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error creating category"
        });
    }
};

export const updateCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) {
            return res.status(404).json({
                success: false,
                msg: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Category updated successfully",
            category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error updating category"
        });
    }
};

export const deleteCategory = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                msg: "Category not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Category deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error deleting category"
        });
    }
};

export const listCategories = async (req = request, res = response) => {
    try {
        const categories = await Category.find();
        res.status(200).json({
            success: true,
            categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Error fetching categories"
        });
    }
};