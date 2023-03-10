import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js"
import { productSchema } from "../validator/productValidate.js";

const ProductRouter = Router()
const product = new ProductManager()

ProductRouter.get("/", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await product.getProducts())
    let allProducts = await product.getProducts();
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit);
})

ProductRouter.get("/:id", async (req, res) => {
    let id = req.params.id
    try {
        let products = await product.getProductsById(id)
        if (products) {
            res.status(200).json(products)
        } else res.status(500).json(error)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

ProductRouter.post("/", async (req, res) => {
    const { error, value } = productSchema.validate(req.body)
    if (error) {
        return res.status(500).json(error.details)
    }
    res.status(200).json(({ status: "Producto subido", paydload: await product.addProducts(value) }))

})

ProductRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    res.send(await product.deleteProducts(id))
})




// ProductRouter.put("/:id", async (req, res) => {
//     let id = req.params.id
//     let updateProducts = req.body
//     res.send(await product.updateProducts(id, updateProducts))
// })





ProductRouter.put("/:id", async (req, res) => {
    let id = req.params.id
    const { error, value, } = productSchema.validate(req.body)
    if (error) {
        return res.status(500).json(error.details)
    } else{
        res.status(200).json(({ status: "Producto actualziado", result: await product.updateProducts(id, value)}))
        // res.status(200).json(({ status: "Producto subido", paydload: (value)}))
    }
    // res.status(200).json(await product.updateProducts(id, value))
})











export default ProductRouter;

