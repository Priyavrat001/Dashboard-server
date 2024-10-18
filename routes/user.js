import express from "express";
import { login, newUser, logout, getUser } from "../controller/user.js";
import {isAuthenticated} from "../middleware/auth.js"

const app = express.Router();

app.get("/me", isAuthenticated, getUser);
app.get("/logout", isAuthenticated, logout);
app.post("/new", newUser);
app.post("/login", login);

export default app;