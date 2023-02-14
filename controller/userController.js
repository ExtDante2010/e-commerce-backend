import User from "../models/userModels.js";

const createUser = async () => {
  const email = req.body.email;
  const findUser = await User.findOne(email);

  if (!findUser) {
    newUser = User.create(req.body);
    res.json(newUser);
  } else {
    res.json({
      message: "User Alreadys, Exit",
      success: false,
    });
  }
};
export default createUser;
