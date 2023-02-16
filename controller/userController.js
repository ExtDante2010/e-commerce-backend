import User from "../models/userModels.js";
import asyncHandlers from "express-async-handler";
import generateToken from "../config/jwTojen.js";

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

  try {
    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});
