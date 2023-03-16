import Express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dbConnect from "./config/dbconnect.js";
import router from "./routes/authRoute.js";
import { errorHandler, notFound } from "./midellwares/errorHandler.js";
import { router as productRoute } from "./routes/productRoute.js";
import { router as blogRoute } from "./routes/blogRoute.js";
import { router as categoryRoute } from "./routes/categotyRoute.js";
import { router as blogCategoryRoute } from "./routes/blogCategoryRoute.js";

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
app.use("/api/blog/", blogRoute);
app.use("/api/category/", categoryRoute);
app.use("/api/blog-category/", blogCategoryRoute);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`server is runing at PORT ${PORT}`);
});
