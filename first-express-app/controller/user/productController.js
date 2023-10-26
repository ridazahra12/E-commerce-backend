const productService = require("../../service/productService");
const categoryController = require("./categoryController");
module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts(); // Use productService to get all products
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve products" });
    }
  },

  // Get a specific product by ID
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await productService.getProductById(productId); // Use productService to get a product by ID

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve the product" });
    }
  },

  // Create a new product
  createProducts: async (req, res) => {
    const category_name = req.body.category_name;
    const { product_name, price, description } = req.body;
    const category = await categoryController.createCategoryHelper({
      category_name,
    });
    const categoryId = category.id;
    const data = await productService.createProduct({
      categoryId,
      product_name,
      price,
      description,
    });
    res.send(data);
  },
  // Update an existing product by ID
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProductData = req.body;

      // Use productService to update the product
      const updatedProduct = await productService.updateProduct(
        productId,
        updatedProductData
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update the product" });
    }
  },

  // Delete a product by ID
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;

      // Use productService to delete the product
      const result = await productService.deleteProduct(productId);

      if (!result) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete the product" });
    }
  },
};
