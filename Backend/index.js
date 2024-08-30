import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./Routes/user.route.js";

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 3000;

//****************MIDDLEWARES Start**********************************

app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

//****************MIDDLEWARES END**********************************

//****************ROUTES Start**********************************

app.use("/api/v1/user", userRoute);

//****************ROUTES END**********************************

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running at the port of ${PORT}`);
});
