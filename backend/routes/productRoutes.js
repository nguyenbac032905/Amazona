import express from "express";
const productRouter = express.Router();
import Product from "../models/productModel.js";

productRouter.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})
productRouter.get("/slug/:slug", async (req,res) => {
    const slug = req.params.slug;
    const product = await Product.findOne({slug: slug});
    console.log(slug)
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: "Product Not Found"});
    }
})
productRouter.get("/:id", async (req,res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: "Product Not Found"});
    }
})
export default productRouter;
