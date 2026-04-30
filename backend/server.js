import express from "express";
import dotenv from "dotenv";
import data from "./data.js";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use((err, req, res, next) => {
    res.status(500).send ({message: err.message});
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})