import express from "express";
import { Router } from "express";
export const AdminRouter = Router();
import bcrypt from "bcrypt"
import mongoose from "mongoose";
import { Admin,Course } from '../db/db.js';
import { adminsignup,coursevali } from "../validationschema/adminval.js";
import { adminauth } from "../middleware/Adminauth.js";
import jwt from "jsonwebtoken"
import {z,json} from "zod";
import dotenv from "dotenv";
dotenv.config();



// creating new admin account
AdminRouter.post('/signup',async (req,res)=>{
    const result = adminsignup.safeParse(req.body)

    if (!result.success){
        return res.status(400).json({message:"Invalid Input", error: result.error.errors})
    }

    const {username,password} = result.data
    const hashedpass = await bcrypt.hash(password,8)
    try {
        const user = await Admin.findOne({username:username});
        if (!user){
                await Admin.create({username,password:hashedpass})
                return res.status(201).json({message: "Admin created successfully!"})
        } else {
            return res.status(409).json({message: "user already exists"})
        }
    } catch(error) {
        return res.status(500).json({message: "Database error", error:error.message})
    }

});

// authenticating the admin ==> okay so key take away authentication and authorization are different things "this here means do user logins"
AdminRouter.post('/login',async (req,res)=>{
    const {username,password} = req.body
    
    const admin = await Admin.findOne({username})
    if (!admin) {
        return res.status(404).json({message:"Admin not found"})
    }
    bcrypt.compare(password,admin.password,(error,result)=> {
        if(error) {
            return res.status(401).json({message: "wrong password!"})
        }
        if(result) {
            const token = jwt.sign(admin._id.toString(),process.env.JWT_SECRET_ADMIN);
            return res.json({message:"you are logined!",token:token})
        }
    });
    
});

// Can create a new course
AdminRouter.post('/new_course',adminauth,async (req,res,next)=>{
    const result = coursevali.safeParse(req.body)
    

    if (!result.success) {
        return res.status(400).json({message:"Invalid Input"});
    }

    try{
        const sametitle = await Course.findOne({title: result.data.title});
        if (sametitle){
            return res.status(409).json({message:"A Course with this title already exists"})
        }

        const newCourse = await Course.create(result.data);
        return res.json({message: "New course created",newCourse});
    } catch(error) {
        return res.status(500).json({message:"Error creating course",error});
    }
});

// Edits an existing course
AdminRouter.put('/updateCourse',adminauth,async (req,res)=>{

});

// Returns all the courses/ can see all courses
AdminRouter.get('/courses',adminauth,async (req,res)=>{
    
});



