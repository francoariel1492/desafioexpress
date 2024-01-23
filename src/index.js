//importaciones

const ProductManager = require("./classes/ProductManager.js");
const express = require("express");

//Puerto
const port = 8000;

//Corro express
const app = express();

app.use(express.urlencoded({ extended: true }));

//instancia de productmanager
const manager = new ProductManager();

//El servidor esta corriendo
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

//End points

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

app.get("/products", async (req, res) => {
  const { limit } = req.query;
  try {
    const products = await manager.getProducts();
    if (!limit) {
      res.status(200).json(products);
    } else {
      const pLimit = products.slice(0, limit);
      res.status(200).json(pLimit);
    }
  } catch (err) {
    res.status(400).json({ error: "Algo salio mal" });
  }
});

app.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await manager.getProductById(Number(pid));
  res.json(product);
});
