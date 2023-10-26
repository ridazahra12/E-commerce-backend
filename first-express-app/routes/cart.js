// routers/cartRouter.js
const express = require("express");
const router = express.Router();
const cartController = require("../controller/user/cartController");
const authenticationController = require("../controller/common/authenticationController");

// Example route that requires authentication
router.post(
  "/add/:productId",
  authenticationController.authenticatetoken,
  cartController.addProductToCart
);
router.get("/cart", cartController.getUserCart);

// Remove a product from the user's cart
router.delete(
  "/remove/:cartId/:productId",
  cartController.removeProductFromCart
);

// Add more routes as needed

module.exports = router;
