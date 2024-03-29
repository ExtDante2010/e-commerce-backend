import User from "../models/userModels.js";
import jsonwebtoken from "jsonwebtoken";
import asyncHandlers from "express-async-handler";

const authMidellware = asyncHandlers(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized token expired, Please login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

export const isAdmin = asyncHandlers(async (req, res, next) => {
  const email = req.user.email;
  const adminUser = await User.findOne({ email });
  if (adminUser.role !== "admin") {
    throw new Error("You are not an admin");
  } else {
    next();
  }
});

export default authMidellware;
