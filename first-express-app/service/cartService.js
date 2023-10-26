const { models } = require("../models");

module.exports = {
  getUserCart: async () => {
    const result = await models.cart.findAll();
    return result;
  },

  addProductToCart: async (data, productId) => {
    console.log(productId);

    const product = await models.product.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    // // Add the product to the cart
    const cart = await models.cart.findOne({ where: { userId: data.userId } });

    if (cart) {
      await cart.addProducts(product);
    } else {
      const newCart = await models.cart.create(data);
      await newCart.addProducts(product);
    }

    // Update total_items and total_price
    const updatedCart = await models.cart.findOne({
      where: { userId: data.userId },
      include: [models.product],
    });

    return updatedCart;
  },

  removeProductFromCart: async (cartId, productId) => {
    console.log(cartId);
    const cart = await models.cart.findOne({
      where: { id: cartId },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    // Remove the product from the cart
    const updatedCarts = await cart.removeProductFromCart(productId);

    return updatedCarts;
  },
};
