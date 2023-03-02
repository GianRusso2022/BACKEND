import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js"

import { productSchema} from "../validator/productValidate.js";

const ProductRouter = Router()
const product = new ProductManager()

ProductRouter.get("/", async (req, res) => {
    res.send(await product.getProducts())
})

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.getProductsById(id))
})

ProductRouter.post("/", async (req, res) => {
    const {error, value}  = productSchema.validate(req.body)
    if (error){
        return res.status(500).json(error.details)
    }
    res.send(await product.addProducts(value))

})

ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})

ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    let updateProducts= req.body
    res.send(await product.updateProducts(id, updateProducts))
})

export default ProductRouter;

