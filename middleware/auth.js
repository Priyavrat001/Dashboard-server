import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({});

export const isAuthenticated = async(req, res, next)=>{
    const token = req.cookies["user-token"];

    if(!token) return res.status(400).json({success:false, message:"Token not found"});

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decodeData._id;
    next();
};
