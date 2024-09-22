import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import authRouter from "./routes/authroute.js";
import listingRouter from './routes/listingroute.js'
import cookieParser from "cookie-parser";
import cors from 'cors';
const app = express();
import path from "path";

mongoose
  .connect("mongodb://127.0.0.1:27017/realestate")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log("error"));

  const __dirname = path.resolve();

  app.use(cors(
    {
      origin:"http://localhost:5173",
      credentials: true
    }
  ));
  app.use(express.json());
  app.use(cookieParser());
  

  app.use('/api/user',userRouter);
  app.use('/api/auth',authRouter);
  app.use('/api/listing',listingRouter);

  app.use(express.static(path.join(__dirname,'/client/dist')));

  app.get('*', (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
 


  app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    });
  })