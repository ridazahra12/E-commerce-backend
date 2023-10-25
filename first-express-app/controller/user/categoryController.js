const categoryService = require("../../service/categoryService");
module.exports = {
  // Retrieve a list of product categories
  getCategories: async (req, res) => {
    try {
      // Use the categoryService to get a list of categories
      const categories = await categoryService.getCategories();

      // Respond with the retrieved categories
      res.json(categories);
    } catch (error) {
      // Handle errors and return a 500 error response
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve categories" });
    }
  },

  // Create a new category
  createCategory: async (req, res) => {
    try {
      // Get the category name from the request body
      const { name } = req.body;

      // Use the categoryService to create a new category
      const category = await categoryService.createCategory(name);

      // Respond with the created category and a 201 status code
      res.status(201).json(category);
    } catch (error) {
      // Handle errors and return a 500 error response
      console.error(error);
      res.status(500).json({ error: "Failed to create a new category" });
    }
  },
};
