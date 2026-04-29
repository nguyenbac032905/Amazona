import express from "express";
import dotenv from "dotenv";
import data from "./data.js";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to MongoDB")).catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter)

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})