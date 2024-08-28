import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config({});

const app = express();

const PORT = process.env.PORT || 3000;

//****************ROUTES Start**********************************

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "i am comming from Parallel Universe",
    success: true,
  });
});

//****************ROUTES END**********************************

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

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running at the port of ${PORT}`);
});
