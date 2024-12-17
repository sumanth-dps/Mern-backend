import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://great-stack-authentication.netlify.app" // Production URL
      : "http://localhost:5173", // Local development
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
const connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("succesfully to connected to Database");
  } catch (error) {
    console.log(error);
  }
};
connectToMDB();

app.use("/api/auth", authRouter);
