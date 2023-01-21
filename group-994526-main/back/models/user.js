const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "Users",
    {
      id_user: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },

      username: {
        type: DataTypes.STRING(255),
        defaultValue: null,
      },

      password: {
        type: DataTypes.STRING(255),
        is: /^[0-9a-f]{64}$/i,
      },

      fk_role: {
        type: DataTypes.TINYINT(4),
        defaultValue: 1,
      },

      email: {
        type: DataTypes.STRING(255),
        validate: {
          isEmail: true, //check if email is valid
        },
        //unique: true,
        defaultValue: null,
      },
    },
    { paranoid: true }
  );

  User.beforeCreate(async (user, options) => {
    let hash = await bcrypt.hash(
      user.password,
      parseInt(process.env.BCRYPT_SALT_ROUND)
    );
    user.password = hash;
  });

  User.checkPassword = async (password, originel) => {
    return await bcrypt.compare(password, originel);
  };

  return User;
};
