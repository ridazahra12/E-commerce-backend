const { models } = require("../models");

module.exports = {
  getUserCart: async () => {
    const result = await models.cart.findAll();
    return result;
  },

  addProductToCart: async (data, productId) => {
    try {
      // Find the product by productId
      const product = await models.product.findByPk(productId);

      if (!product) {
        throw new Error("Product not found");
      }

      // Check if the user already has a cart
      let cart = await models.cart.findOne({
        where: { userId: data.userId },
      });

      if (!cart) {
        // If the user doesn't have a cart, create one
        cart = await models.cart.create({ userId: data.userId });
      }

      // Add the product to the cart
      await models.cartItem.create({
        cartId: cart.id,
        productId: product.id,
      });

      // Update total_items and total_price
      cart = await models.cart.findByPk(cart.id, {
        include: models.product, // To get the products in the cart
      });

      const totalItems = cart.products.length;
      const totalPrice = cart.products.reduce(
        (acc, product) => acc + product.price,
        0
      );

      // Update the cart's total_items and total_price
      await cart.update({
        total_items: totalItems,
        total_price: totalPrice,
      });

      return cart;
    } catch (error) {
      throw new Error("Error adding product to cart: " + error.message);
    }
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
    const updatedCart = await cart.removeProduct(productId);

    return updatedCart;
  },
};
