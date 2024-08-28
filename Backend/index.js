import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//****************ROUTES Start**********************************

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "i am comming from Randi KHAANA",
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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running at the port of ${PORT}`);
});
