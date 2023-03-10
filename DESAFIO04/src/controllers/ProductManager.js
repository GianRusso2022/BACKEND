import { promises as fs } from "fs"
import { nanoid } from "nanoid"

class ProductManager {
    constructor() {
        this.path = "./src//models/products.json"
    }

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8")
        return JSON.parse(products)
    }
    
    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    exist = async (id) => {
        let products = await this.readProducts()
        return products.find(p => p.id === id)
    }

    addProducts = async (product) => {
        let ProductsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...ProductsOld, product]
        await this.writeProducts(productAll)
    }

    getProducts = async () => {
        return await this.readProducts()
    }

    getProductsById = async (id) => {
        let productById = await this.exist(id)
        if (productById){
            return productById
        } else throw new Error(`Error: No se encontro el id${id}.`) 
    }



//  updateProducts = async (id, product) => {
//         let productById = await this.exist(id)
//         if (!productById) return "Producto inexistente"
//         await this.deleteProducts(id)
//         let productOld = await this.readProducts()
//         let products = [{ ...product, id: id }, ...productOld]
//         await this.writeProducts(products)
//         return "Producto actualizado"
//     }

    updateProducts = async (id, product) => {
        this.getProductsById(id)
        await this.deleteProducts(id)
        let productOld = await this.readProducts()
        let products = [{ ...product, id: id }, ...productOld]
        await this.writeProducts(products)
    }








    deleteProducts = async (id) => {
        let products = await this.readProducts()
        let existProduct = products.some(p => p.id === id)
        if (existProduct) {
            let filterProducts = products.filter(p => p.id != id)
            await this.writeProducts(filterProducts)
            return "Prodcuto eliminado"
        }
        return "Producto inexistente"
    }
}

export default ProductManager