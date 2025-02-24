import User from '../users/user.model.js';
import Post from "../post/post.model.js";
import Category from "../category/category.model.js";

export const existenteEmail = async (email = '') =>{
    const existeEmail = await User.findOne({ email });

    if(existeEmail){
        throw new Error(`El email ${ email } ya existe en la base de datos`);
    }
}

export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);

    if(!existeUsuario){
        throw new Error(`El ID ${id} no existe`);
    }
}


export const existingPost = async (id = '') => {
    const post = await Post.findById(id);

    if (!post) {
        throw new Error(`The post with ID ${id} does not exist.`);
    }
};


export const existingCategory = async (id = '') => {
    const category = await Category.findById(id);
    if (!category) {
        throw new Error(`The category with ID ${id} does not exist.`);
    }
};