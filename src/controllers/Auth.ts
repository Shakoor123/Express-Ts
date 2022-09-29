import User from "../models/user";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
const saltRounds = process.env.SALT || 10;

//CREATE A USER

const registerFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const hash = await bcrypt.hashSync(req.body.password, saltRounds);

  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: hash,
  });
  return user
    .save()
    .then((user) => res.status(201).json({ user }))
    .catch((err) => res.status(500).json({ err }));
};

//LOGIN USER

const loginFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email: String = req.body.email;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const response = await bcrypt.compareSync(
        req.body.password,
        user?.password
      );
      if (response === true) {
        res.status(201).json({ user });
      } else {
        res.status(500).json({ meassage: "password is incorrect" });
      }
    } else {
      res.status(500).json({ meassage: "user is not found" });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

export default { registerFunction, loginFunction };
