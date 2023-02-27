import Express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbconnect.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./midellwares/errorHandler.js";
import router from "./routes/authRoute.js";
// import router from "./routes/productRoute.js";
import cookieParser from "cookie-parser";

const app = Express();
const doteNv = dotenv.config();
const PORT = process.env.PORT || 3000;

dbConnect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user/", router);
// app.use("/api/product/", router);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is runing at PORT ${PORT}`);
});
