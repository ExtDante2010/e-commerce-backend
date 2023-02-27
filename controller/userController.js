import User from "../models/userModels.js";
import asyncHandlers from "express-async-handler";
import generateToken from "../config/jwTojen.js";
import { validateMoondoId } from "../utils/validateMondodb.js";
import generateRefreshToken from "../config/refreshToken.js";
import jsonwebtoken from "jsonwebtoken";

// CREATE USER //

export const createUser = asyncHandlers(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const newUser = User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User Alreadys Exits");
  }
});

//LOGIN USER //

export const loginUser = asyncHandlers(async (req, res) => {
  const { email, password } = req.body;

  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser,
      {
        refreshToken: refreshToken,
      },
      {
        new: true,
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      phone: findUser?.phone,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credential");
  }
});

// HANDLE REFRESH TOKEN //

export const handleRefreshToken = asyncHandlers(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.refreshToken) throw new Error("No refresh token in Cookies");
  const refreshToken = cookie.refreshToken;
  console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error("No refresh token prensent in db or not matched");
  jsonwebtoken.verify(
    refreshToken,
    process.env.JWT_TOKEN,
    (error,
    (decoded) => {
      if (error || user.id !== decoded.id) {
        throw new Error("There is Something wrong with refresh token ");
      }
      const accessToken = generateToken(user?._id);
      res.json({ accessToken });
    })
  );
  res.json(user);
});

//UPDATE A USER //

export const updateAuser = asyncHandlers(async (req, res) => {
  const { _id } = req.user;
  validateMoondoId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req.body?.firstname,
        lastname: req.body?.lastname,
        email: req.body?.email,
        phone: req.body?.phone,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

// ALL USER//

export const getAlluser = asyncHandlers(async (req, res) => {
  try {
    const getUsers = await User.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// GET A USER //

export const getAuser = asyncHandlers(async (req, res) => {
  const { id } = req.params;

  validateMoondoId(id);

  try {
    const getUser = await User.findById(id);
    res.json({
      getUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE A USER //

export const deleteAuser = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  validateMoondoId(id);

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// BLOCKED AND UNBLOCKER USER //

export const blockUser = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  validateMoondoId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User Block",
    });
  } catch (error) {
    throw new Error(error);
  }
});
export const unblockUser = asyncHandlers(async (req, res) => {
  const { id } = req.params;
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User unblocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});
