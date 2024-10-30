
import userRouter from "./routes/user.js";
import authRouter from "./routes/authroute.js";
import listingRouter from './routes/listingroute.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";
import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";

const app = express();
const PORT = 3000;

dotenv.config();

mongoose
  .connect("mongodb+srv://patelnaisargi74:naisargi123@cluster0.8rpesqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

const __dirname = path.resolve();

app.use(cors({
  origin: "https://realestate-frontend-psi.vercel.app/",  // Allow requests from Vite server
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Set up routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Serve static files from client build folder
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
