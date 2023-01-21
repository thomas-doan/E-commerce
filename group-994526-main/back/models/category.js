/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require("sequelize");

/*******************************/
/*** Définition du modèle Cocktail */
module.exports = (sequelize) => {
  return (category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER(100),
        primaryKey: true,
        autoIncrement: true,
      },

      category: {
        type: DataTypes.STRING(100),
        defaultValue: null,
        allowNull: true,

        validate: {
          len: [3, 15],
          notEmpty: true,
          isAlpha: true,
        },
      },

      image: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },
    },
    { paranoid: true }
  ));
};
