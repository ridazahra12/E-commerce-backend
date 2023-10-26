const cartService = require("../../service/cartService");

module.exports = {
  getUserCart: async (req, res) => {
    const cart = await cartService.getUserCart(req.body);
    res.send(cart);
  },

  addProductToCart: async (req, res) => {
    const result = await cartService.addProductToCart(
      req.body,
      req.params.productId
    );
    res.send(result);
  },

  removeProductFromCart: async (req, res) => {
    const result = await cartService.removeProductFromCart(
      req.params.cartId,
      req.params.productId
    );
    console.log("result", result);

    res.send("Product from cart deleted");
  },
};
