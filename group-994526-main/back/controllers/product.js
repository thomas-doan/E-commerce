const DB = require("../db.config");
const Product = DB.Product;
const User = DB.User;
const Category = DB.Category;
const role = require("../jsonwebtoken/interface_role");
// const fileUpload = require('express-fileupload');
const multer = require("multer");
const upload = multer({ dest: "../front/c2wk/src/assets/" });

findById = async (id) => {
  const idnb = parseInt(id);
  return await Product.findOne({ where: { id_product: idnb }, raw: true });
};

findByName = async (name, table, section) => {
  return await table.findOne({ where: { section: name }, raw: true });
};

exports.createProduct = (req, res) => {
  const { name, description, price, image, CategoryId } = req.body;

  // if (!name || !description || !price || !image || !category)
  // return res.status(400).json({ message: 'Missing Data' })
  Product.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    CategoryId: req.body.CategoryId,
    UserIdUser: TokenUserDecrypt.id_user,
  })
    .then((product) => {
     /*  res.json(product); */
     res.status(200).json({success : true});
    })
    .catch((err) => {
      res.status(500).json({ message: "database error", error: err });
    });
};

exports.getProductById = (req, res) => {
  const id = +req.params.id;
  Product.findOne({
    where: { id_product: id },
    include: {
      model: User,
      attributes: ["id_user", "username", "email", "password"],
    },
  })
    .then((product) => {
      res.json(product);
    })
    .catch((err) => {
      res.status(500).json({ message: "database error", error: err });
    });
};

exports.editProduct = async (req, res) => {
  const id = +req.params.id;

  if (
    TokenUserDecrypt.fk_role == role.USER &&
    TokenUserDecrypt.id_user != (await findById(id)).UserIdUser
  ) {
    return res.status(401).json({
      message: "You are not allowed to edit products that are not yours!",
    });
  }
  Product.update(
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      CategoryId: req.body.CategoryId,
    },
    { where: { id_product: id } }
  )
    .then(() => {
      res.status(200).json("Updated successfully the product with id = " + id);
    })
    .catch((err) => {
      res.status(500).json({ message: "database error", error: err });
    });
};

exports.deleteProduct = async (req, res) => {
  const id = +req.params.id;

  if (
    TokenUserDecrypt.fk_role == role.USER &&
    TokenUserDecrypt.id_user != (await findById(req.params.id)).fk_id_user
  )
    return res.status(401).json({
      message: "You are not allowed to delete products that are not yours!",
    });
  Product.destroy({
    where: { id_product: id },
  })
    .then(() => {
      res.status(204).json("Deleted successfully the product with id = " + id);
    })
    .catch((err) => {
      res.status(500).json({ message: "database error", error: err });
    });
};

exports.getAllProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: "database error", error: err });
    });
};

exports.getProductsByUser = (req, res) => {
  const id = +req.params.id;

  Product.findAll({ where: { UserIdUser: id } })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: "database error", error: err });
    });
};

exports.getProductsByCategory = (req, res) => {
  const id = req.params.id;

  Product.findAll({
    where: { CategoryId: id },
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.status(500).json({ message: "database error", error: err });
    });
};

exports.uploadImage = (req, res) => {
  res.json({
    message: "File uploaded successfully",
    file: req.file,
  });
};
