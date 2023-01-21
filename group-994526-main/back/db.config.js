const { Sequelize } = require("sequelize");

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};

db.sequelize = sequelize;
db.User = require("./models/user")(sequelize);
db.Adresse = require("./models/adresse")(sequelize);
db.Product = require("./models/product")(sequelize);
db.Category = require("./models/category")(sequelize);

db.User.hasMany(db.Adresse);
db.Adresse.belongsTo(db.User, {
  onDelete: "cascade",
});
db.User.hasMany(db.Product);
db.Product.belongsTo(db.User, {
  onDelete: "cascade",
});

db.Category.hasMany(db.Product);
db.Product.belongsTo(db.Category);

db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database Sync OK");

  /*         db.Adresse.create({
            pays: 'France',
            ville: 'Paris',
            adresse_of_user: 'rue de la paix',
            cp: 75000,
            UserId: 2
        }) */
});

/*   db.sequelize.sync({alter: true})     */
/*    db.User.sync({alter: true})   */
/*  db.User.sequelize.sync()  */

module.exports = db;
