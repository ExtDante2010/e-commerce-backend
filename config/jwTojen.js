import jsonwebtoken from "jsonwebtoken";

const generateToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "1d" });
};

export default generateToken;
