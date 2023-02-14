import Express from "express";
import dotenv from "dotenv";
const app = Express();
import dbConnect from "./config/dbconnect.js";
import router from "./routes/authRoute.js";
const doteNv = dotenv.config();
const PORT = process.env.PORT || 3000;

dbConnect();

app.use("/api/user", router);

app.listen(PORT, () => {
  console.log(`server is runing at PORT ${PORT}`);
});
