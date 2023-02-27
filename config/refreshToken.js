import jsonwebtoken from "jsonwebtoken";

const generateRefreshToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "3d" });
};

export default generateRefreshToken;
