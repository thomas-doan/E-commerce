/************************************/
/*** Import des modules nécessaires */
const { DataTypes } = require('sequelize')

/*******************************/
/*** Définition du modèle Cocktail */
module.exports = (sequelize) => {
    return Adresse = sequelize.define('Adresse', {
        id: {
            type: DataTypes.INTEGER(100),
            primaryKey: true,
            autoIncrement: true
        },

            pays:{
            type: DataTypes.STRING(100),
            defaultValue: null,
            allowNull: true
        },

            ville:{
            type: DataTypes.STRING(100),
            defaultValue: null,
            allowNull: true
        },

        adresse_of_user:{
            type: DataTypes.STRING(100),
            defaultValue: null,
            allowNull: true
        },

        cp:{
            type: DataTypes.INTEGER(100),
            defaultValue: null,
            allowNull: true
        }

    }, { paranoid: true })          
}


/****************************************/
/*** Ancienne Synchronisation du modèle */
/*  Adresse.sync() */
/*  Cocktail.sync({force: true}) */
/* Cocktail.sync({alter: true}) */
