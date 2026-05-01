import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email" });
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send({ message: "Invalid password" });
    }

    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user)
    });
  })
);
userRouter.post(
  "/signup", 
  expressAsyncHandler(async (req,res) => {
    const existUser = await User.findOne({email: req.body.email});
    if(existUser){
        return res.status(400).send({message: "Email already exists"});
    }
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    const createdUser = await user.save();

    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser)
    })
}))
export default userRouter;