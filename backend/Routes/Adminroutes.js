import { Router } from "express";
export const AdminRouter = Router();
import bcrypt from "bcrypt"
import { Admin,Course } from '../db/db.js';
import { signup,coursevali } from "../validationschema/adminval.js";
import { Auth } from "../middleware/Auth.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();



// creating new admin account
AdminRouter.post('/signup',async (req,res)=>{
    const result = signup.safeParse(req.body)

    if (!result.success){
        return res.status(400).json({message:"Invalid Input", error: result.error})
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
AdminRouter.post('/Courses', Auth, async (req,res)=>{
    const result = coursevali.safeParse(req.body)
    

    if (!result.success) {
        return res.status(400).json({message:"Invalid Input"});
    }

    try{
        const sametitle = await Course.findOne({title: result.data.title});
        if (sametitle) {
            return res.status(409).json({message:"A Course with this title already exists"})
        }

        const newCourse = await Course.create(result.data);
        return res.json({message: "New course created",newCourse});
    } catch(error) {
        return res.status(500).json({message:"Error creating course",error});
    }
});

// delete an existing course
AdminRouter.delete('/Courses/:id', Auth, async (req,res)=>{
    try {
    const id = req.params.id;
    const findcourse = await Course.findOne({ _id: id });

    if (findcourse) {
      await Course.deleteOne({ _id: id });
      return res.json({ message: "Course Deleted!" });
    } else {
      return res.status(404).json({ message: "Course not found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
// Edits an existing course
AdminRouter.put('/Courses/:id',Auth,async (req,res)=>{

});

// Returns all the courses/ can see all courses
AdminRouter.get('/Courses',Auth,async (req,res)=>{
    try{
        const allCourses = await Course.find();
        if (allCourses.length == 0) {
            return res.json({message:"There are no courses available"});
        }
        return res.json(allCourses);
    } catch(error){
        return res.status(500).json({message:"database problem"})
    }
});



