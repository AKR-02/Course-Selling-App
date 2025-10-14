import express from "express";
import jwt from "jsonwebtoken"
import mongoose from "mongoose";
// import { UserRouter } from "./Routes/Userroutes"
import { AdminRouter } from "./Routes/Adminroutes.js"
const app = express();

mongoose.connect("mongodb+srv://Hardik_Raut:3272%40Gmail@cluster0.ttthbjv.mongodb.net/Course-Selling-Project")

app.use(express.json());
// app.use('/user', UserRouter);
app.use('/admin', AdminRouter);

app.listen(3000)
