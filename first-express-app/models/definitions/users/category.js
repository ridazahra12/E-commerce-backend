const DataTypes = require("sequelize");
const sequelize = require("../../../common/dbConnection");

const Category = sequelize.define(
  "Category",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, paranoid: true, sequelize, modelName: "category" }
);

module.exports = Category;
