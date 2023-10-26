const userController = require("../user/userController");
const categoryController = require("../user/categoryController");
const productController = require("../user/productController");
const cartController = require("../user/cartController");
const authenticationController = require("./authenticationController");

module.exports = {
  userController,
  categoryController,
  productController,
  cartController,
  authenticationController,
};
