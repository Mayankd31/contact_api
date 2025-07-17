import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log("printing the data = ", req.body);

  if (name == "" || email == "" || password == "") {
    return res.json({
      message: "All fields are required",
    });
  }

  let user = await User.findOne({ email });
  if (user) {
    return res.json({
      message: "User Already Exists..!!",
      success: false,
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashPassword });

  res.json({
    message: "User created successfully...!!",
    success: true,
    user,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "") {
    return res.json({
      message: "All fields are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.json({
      message: "User Not Exists",
      success: false,
    });
  }

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass) {
    return res.status(400).json({
      message: "Invalid Password",
      success: false,
    });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.json({
    message: `Welcome ${user.name}`,
    token,
    success: true,
  });
};
