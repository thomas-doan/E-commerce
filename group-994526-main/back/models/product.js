const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Product = sequelize.define(
    "Products",
    {
      id_product: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      price: {
        type: DataTypes.FLOAT(11),
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      image: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
      CategoryId: {
        type: DataTypes.INTEGER(11),
        defaultValue: null,
      },
      UserIdUser: {
        type: DataTypes.INTEGER(11),
        defaultValue: null,
      },
    },
    { paranoid: true }
  );
  return Product;
};
