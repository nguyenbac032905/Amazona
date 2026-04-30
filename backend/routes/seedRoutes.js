import express from "express";
import data from "../data.js";
const seedRouter = express.Router();
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

seedRouter.get("/", async (req,res) => {
    await User.deleteMany({});
    const createdRecords = await User.insertMany(data.users);
    res.send({createdRecords});
})

export default seedRouter;