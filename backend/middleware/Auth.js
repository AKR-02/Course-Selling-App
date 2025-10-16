
import { Admin } from "../db/db.js";
import dotenv from "dotenv";
dotenv.config()
import jwt from "jsonwebtoken";

export async function Auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Malformed token" });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

    // Attach verified info to request
    req._id = verified; // or req.adminId = verified if you want it clearer
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}


