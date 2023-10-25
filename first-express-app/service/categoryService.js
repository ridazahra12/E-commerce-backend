const Category = require("../models/definitions/users/category");

module.exports = {
  createCategory: async (name) => {
    const createdCategory = await Category.create({ name });
    return createdCategory;
  },
  getCategories: async () => {
    const categories = await Category.findAll();
    return categories;
  },
  updateCategory: async (categoryId, updatedCategoryData) => {
    await Category.update(updatedCategoryData, { where: { id: categoryId } });
    return "Category updated successfully";
  },
  deleteCategory: async (categoryId) => {
    await Category.destroy({ where: { id: categoryId } });
    return "Category deleted successfully";
  },
};
