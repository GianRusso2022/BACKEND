import ProductManager from "./components/ProductManager.js";
import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));

const products = new ProductManager()
const readProducts = products.readProducts()

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await readProducts)
    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit);
})

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts;
    let findProductsById = allProducts.find(p => p.id === id)
    res.send(findProductsById)
})

const port = 8080
const server = app.listen(port, () => {
    console.log(`corriendo en puerto ${port}`);
})
server.on("error", (error) => console.log(`error del servidor ${error}`))
