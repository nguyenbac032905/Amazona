import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

import data from "./data.js";
app.get("/api/products", (req,res) => {
    res.send(data.products);
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})