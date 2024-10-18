import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { TryCatch, cookieOptions, sendToken } from "../utils/features.js";

export const getUser = TryCatch(async (req, res, next) => {
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    return res.status(200).json({ success: true, user });
});

export const logout = TryCatch(async (req, res, next) => {

    return res.status(200).cookie("user-token", "", { ...cookieOptions, maxAge: 0 }).json({ success: true, message: "Logout Sucessfully" });
})

export const newUser = TryCatch(async (req, res, next) => {
    
    const { name, username, password } = req.body;

    if (!name, !username, !password) {
        return res.status(400).json({ success: false, message: "Invalid Credentails" });
    };

    const Isuser = await User.findOne({ username });
    if (Isuser) {
        return res.status(400).json({ success: false, message: "User already exist." })
    };
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        name: name,
        username: username,
        password: hashPassword
    });

    return sendToken(res, user, 200, "User created successfully")
});

export const login = TryCatch(async (req, res, next) => {
    
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json("Invalid Username or Password");
    };

    return sendToken(res, user, 200, `Welcome ${user.username}`);

})

