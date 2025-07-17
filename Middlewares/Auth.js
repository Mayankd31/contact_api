import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.header("Auth");

  console.log("check token = ", token);

  if (!token) {
    return res.json({
      message: "Login First",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const id = decoded.userId;

  let user = await User.findById(id);

  if (!user) {
    return res.json({
      message: "User Not Found",
    });
  }

  req.user = user; // for globally saving the user , it is saved when the token is correct
  next();
};
