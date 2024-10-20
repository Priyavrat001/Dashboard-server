import dotenv from "dotenv";

dotenv.config();


export const corsOptions = {
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "https://dashboard-app-client.netlify.app",
      "https://dashboard-client-xi.vercel.app",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };