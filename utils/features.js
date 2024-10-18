import dotenv from "dotenv"
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
dotenv.config({});

export const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

export const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("user-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });

};

const mongoUri = process.env.MONGO_URI;

export const connectToDB = async () => {
  mongoose.connect(mongoUri)
    .then(c => console.log(`Mongodb is connected on ${c.connection.name}`))
    .catch(err => { console.error(err.message) })
};

export const TryCatch = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);;
  } catch (err) {
    next(err)
  }
}