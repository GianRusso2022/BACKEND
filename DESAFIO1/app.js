const { producto1, producto2 } = require("./db/products");
const { ProductManager } = require("./class/ProductManager");

// START

const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct(producto1);

console.log(productManager.getProducts());

productManager.addProduct(producto2);

productManager.getProductById(2);

