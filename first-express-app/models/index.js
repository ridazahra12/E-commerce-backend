let sequelize = require("../common/dbConnection");
let user = require("../models/definitions/users/user");
let cart = require("../models/definitions/users/cart");
let category = require("../models/definitions/users/category");
let product = require("../models/definitions/users/product");
// Set up associations
user.hasOne(cart, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  foreignKey: { name: "userId", allowNull: false, unique: true },
}); // One-to-One relationship: Each user has one shopping cart
cart.belongsTo(user, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
  foreignKey: { name: "userId", allowNull: false, unique: true },
}); // One-to-One relationship: Each cart belongs to one user

// Define any other associations with other tables (e.g., orders) based on your requirements
// user.hasMany(order); // One-to-Many relationship: Each user can have multiple orders

category.hasMany(product, {
  foreignKey: { name: "categoryId", allowNull: false, unique: true },
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
}); // Many-to-Many: A category can have multiple products, and a product can belong to multiple categories
product.belongsTo(category, {
  foreignKey: { name: "categoryId", allowNull: false, unique: true },
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

product.belongsTo(category); // Many-to-One: Each product belongs to one category
product.belongsToMany(cart, {
  through: "cartItems",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
}); // Many-to-Many: A product can be added to multiple carts, and a cart can have multiple products
cart.belongsToMany(product, {
  through: "cartItems",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

// cart.hasMany(order); // One-to-Many: A cart can have multiple orders
// order.belongsTo(cart); // Many-to-One: An order belongs to one cart

const models = sequelize.models;
console.log(models);
const db = {};
db.sequelize = sequelize;
module.exports = { db, models };
