import { Router } from "express";
export const UserRouter = Router();
import { User } from "../db/db.js";
import bcrypt from "bcrypt";
import { Auth } from "../middleware/Auth.js";
import { signup,coursevali } from "../validationschema/adminval.js";
import jwt from "jsonwebtoken";

//Create a new user account
UserRouter.post('/signup', async (req,res)=>{
    const result =  signup.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({message: "Invalid Input", error: result.error})
    }

    const {username,password} = result.data;
    const hashedpass = await bcrypt.hash(password,8);
    try {
        const user = await User.findOne({username:username})
        if (!user) {
            await User.create({username,password:hashedpass});
            return res.status(201).json({message: "user created!"});
        } else {
            return res.status(409).json({message:"user already exists!"});
        };
    } catch(error) {
        return res.status(500).json({message: "Database error!", error:error.message})
    }

});


//authenticate the user
UserRouter.post('/login', async (req,res)=>{
    const { username, password } = req.body;

    try{
        const user = await User.findOne({username});
        if (!username){
            return res.status(404).json({message:"User not found!"});
        }
        bcrypt.compare(password,user.password, (error,result) =>{
            if (error) {
                return res.status(401).json({message: "Incorrect password!"});
            }
            if (result) {
                const token = jwt.sign(user._id.toString(),process.env.JWT_SECRET_USER);
                return res.status(201).json({message:"You are logged in!", token:token});
            }
        });
    } catch (error) {
        return res.status(500).json({message: "Database error!", error:error.message})
    }
})
//Lists all the courses the user has access to 
UserRouter.get('/courses',Auth, async (req,res)=>{
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
//purchase a course
UserRouter.post('/courses',Auth,async (req,res)=> {

})
//List of all the courses purchased by the user
UserRouter.get('/purchased_courses',Auth,async (req,res)=> {

})