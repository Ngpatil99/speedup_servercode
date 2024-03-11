import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from 'cors'
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import adminRoutes from "./routes/adminRout.js";
import blogRoute from "./routes/blogRoute.js";
import careerRoute from "./routes/careerRoute.js";
import lifelineRoute from "./routes/lifelineRoute.js";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/admin/blog",blogRoute);
app.use("/api/admin/career",careerRoute);
app.use("/api/admin/lifeline",lifelineRoute);




//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});