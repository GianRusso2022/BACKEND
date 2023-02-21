import { promises as fs } from "fs"

export class ProductManager {
    constructor() {
        this.patch = "products.txt"
        this.productss = []
    }

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        };

        this.productss.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.productss));

    }

    readProducts = async () => {
        let response = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(response)
    }

    getProducts = async () => {
        let response2 = await this.readProducts();
        return console.log(response2);
    }

    getProductById = async (id) => {
        let response3 = await this.readProducts()
        if (!response3.find(product => product.id === id)) {
            console.log("Producto no encontrado");
        } else {
            console.log(response3.find(product => product.id === id));
        }


    }

    deleteProductById = async (id) => {
        let response3 = await this.readProducts();
        let productFilter = response3.filter(products => products.id != id)
        console.log(productFilter);
        await fs.writeFile(this.patch, JSON.stringify(productFilter));
        console.log("producto eliminado");
    }

    updateProduct = async ({ id, ...product }) => {
        await this.deleteProductById(id)
        let oldProduct = await this.readProducts()
        let modifiedProduct = [
            { id, ...product },
            ...oldProduct]
        await fs.writeFile(this.patch, JSON.stringify(modifiedProduct));

    }

}

export default ProductManager;

