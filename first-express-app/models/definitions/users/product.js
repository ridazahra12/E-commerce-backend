const DataTypes = require("sequelize");
const sequelize = require("../../../common/dbConnection");

const Product = sequelize.define(
  "Product",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true, sequelize, modelName: "product" }
);

module.exports = Product;
