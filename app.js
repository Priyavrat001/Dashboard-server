import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/user.js";
import { connectToDB } from "./utils/features.js";
import dataRoute from "./routes/data.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { corsOptions } from "./config/corsOrigin.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());
connectToDB();


app.get("/working", (_, res)=>{
    res.send("its working");
});

app.use("/api/v1/user", userRoute)
app.use("/api/v1", dataRoute)

app.use(errorMiddleware);

app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`)
});