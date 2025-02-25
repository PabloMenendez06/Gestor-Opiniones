'use strict';
 
import mongoose from "mongoose";
import User from "../src/users/user.model.js";
import Category from '../src/category/category.model.js' 
import { hash } from "argon2";

export const dbConnection = async () =>{
    try{
        mongoose.connection.on('error', ()=>{
            console.log('Could not be connected to MongoDB');
            mongoose.disconnect();
        });
 
        mongoose.connection.on('connecting', ()=>{
            console.log('Try Connecting');
        });
 
        mongoose.connection.on('connected', async ()=>{
            console.log('connected to MongoDB');
            try {
                const adminExists = await User.findOne({ role: "ADMIN" });
                if (!adminExists) {
                    const adminPassword = await hash("12345678");
                    await User.create({
                        name: "Cristiano",
                        surname: "Ronaldo",
                        username: "cristianoronaldo",
                        email: "ronaldo@gmail.com",
                        password: adminPassword,
                        role: "ADMIN"
                    });
                    console.log("Administrator user created ");
                } else {
                    console.log("Administrator user already exists");
                }
            
                const defaultCategory = await Category.findOne({ name: "Default" });
                if (!defaultCategory) {
                    await Category.create({ name: "Categoria defecto" });
                    console.log("Default category created");
                } else {
                    console.log("Default category already exists");
                }
            } catch (error) {
                console.error("Error verifying/creating admin or category:", error);
            }
        });
 
        mongoose.connection.on('open', ()=>{
            console.log('connected to database');
        });
 
        mongoose.connection.on('reconnected', ()=>{
            console.log('reconnected to MongoDB');
        });
 
        mongoose.connection.on('disconnected', ()=>{
            console.log('disconnected');
        });
 
        mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });
    }catch(error){
        console.log('Database connection failed' , error);
    }
}