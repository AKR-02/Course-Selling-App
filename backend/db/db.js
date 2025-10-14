import * as mongoose from "mongoose";



const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'CourseSchema'
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number
});





export const Admin = mongoose.model("Admin",AdminSchema);
export const User = mongoose.model("User",UserSchema);
export const Course = mongoose.model("Course",CourseSchema)


