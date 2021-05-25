import mongoose from "mongoose";
import User from "../models/userData.js";
import bcrypt from "bcryptjs"; //to hash the password
import jwt from "jsonwebtoken";

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "user doesn't exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid credential" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    ); //jwt.sign({what want to store},secret message,expires in)

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "something went Wrong" });
  }
};

export const signUp = async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({ message: "password don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstname} ${lastname}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    }); //jwt.sign({what want to store},secret message,expires in)
    return res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something went Wrong" });
  }
};
