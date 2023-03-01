import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dbConnect from "./config/dbconnect.js";
import router from "./routes/authRoute.js";
import { errorHandler, notFound } from "./midellwares/errorHandler.js";
import { router as productRoute } from "./routes/productRoute.js";

const app = Express();
const doteNv = dotenv.config();
const PORT = process.env.PORT || 3000;

dbConnect();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user/", router);
app.use("/api/product/", productRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is runing at PORT ${PORT}`);
});
