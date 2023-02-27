import { promises as fs, read } from "fs"
import { nanoid } from "nanoid"
import ProductManager from "./ProductManager.js"

const productAll = new ProductManager

class CartManager {
    constructor() {
        this.path = "./src//models/carts.json"
    }

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8")
        return JSON.parse(carts)
    }

    exist = async (id) => {
        let carts = await this.readCarts()
        return carts.find(c => c.id === id)
    }

    getCartsById = async (id) => {
        let cartById = await this.exist(id)
        if (!cartById) return "Carrito inexistente"
        return cartById
    }

    writeCarts = async (carts) => {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    addCarts = async () => {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{ id: id, products: [] }, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito agregado"
    }

    addProductInCart = async (cartId, prodId) => {
        let cartById = await this.exist(cartId)
        if (!cartById) return "Carrito inexistente"
        let productById = await productAll.exist(prodId)
        if (!cartById) return "Producto inexistente"
        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(c => c.id != cartId)
        if (cartById.products.some((p) => p.id === prodId)) {
            let productInCart = cartById.products.find((p) => p.id === prodId)
            productInCart.qty++
            let cartsConcat = [cartById, ...cartFilter]
            await this.writeCarts(cartsConcat)
            return "Producto incluido en carrito"
        }
        cartById.products.push({ id: productById.id, qty: 1 })
        let cartsConcat = [cartById, ...cartFilter]
        await this.writeCarts(cartsConcat)
        return "Producto agregado al carrito"
    }
}

export default CartManager