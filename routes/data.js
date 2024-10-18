import express from "express";
import { getAllData } from "../controller/data.js";
import {isAuthenticated} from "../middleware/auth.js"

const app = express.Router();

app.get("/data",isAuthenticated, getAllData);

export default app;