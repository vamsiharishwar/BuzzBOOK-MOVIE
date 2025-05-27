import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"; // ✅ use ES Module style since you’re using import

import userRouter from './routes/user-route.js';
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingRouter from "./routes/booking-route.js";

dotenv.config();

const app = express();

// ✅ Apply middlewares
app.use(cors()); // <== This enables CORS for all origins
app.use(express.json());

// ✅ Route middlewares
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);

// ✅ MongoDB connection
mongoose
  .connect(
    `mongodb+srv://vmedikonda6:${process.env.MONGODB_PASSWORD}@cluster0.ocejlta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("✅ Connected to database and server on port 5000")
    )
  )
  .catch((err) => console.error("❌ DB Connection Error:", err));
