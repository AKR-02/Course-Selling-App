import express from "express";
const app = express();
import * as z from "zod";

//Create a new user account
app.post('/users/signup',(req,res)=>{
    const Username = req.body.Username;
    const Password = req.body.Password;
    
});
//authenticate the user
app.post('/users/login', (req,res)=>{

})
//Lists all the courses the user has access to 
app.get('/users/courses',(req,res)=>{

})
//purchase a course
app.post('/users/courses', (req,res)=> {

})
//List of all the courses purchased by the user
app.get('/users/purchased_courses', (req,res)=> {

})