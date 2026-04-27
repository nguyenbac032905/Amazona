import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

import data from "./data.js";
app.get("/api/products", (req,res) => {
    res.send(data.products);
})
app.get("/api/product/slug/:slug", (req,res) => {
    const slug = req.params.slug;
    const product = data.products.find(product => product.slug == slug);
    console.log(slug)
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: "Product Not Found"});
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})