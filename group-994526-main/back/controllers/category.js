const DB = require("../db.config");
const Product = DB.Product;
const User = DB.User;
const Category = DB.Category;
const role = require("../jsonwebtoken/interface_role");

findBy = async (table, dataField) => {
  const data = parseInt(dataField);
  return await table.findOne({ where: { id: data }, raw: true });
};

findByCategory = async (table, dataField) => {
  return await table.findOne({ where: { category: dataField }, raw: true });
};

exports.getCategories = async (req, res) => {
  try {
    Category.findAll().then((categories) => {
      res.json(categories);
    });
  } catch (err) {
    return res.status(500).json({ message: "Database Error", error: err });
  }
};

exports.createCategory = async (req, res) => {
  if (TokenUserDecrypt.fk_role == 2) {
    data_field = req.body.category;

    if (await findByCategory(Category, data_field)) {
      return res.status(401).json({
        message: "This category already exists ",
      });
    }

    Category.create({
      category: data_field,
    })

      .then(() => res.json("message: Category created"))
      .catch((err) =>
        res.status(500).json({ message: "Database Error", error: err })
      );
  } else {
    return res
      .status(401)
      .json({ message: "You are not allowed to access this route !" });
  }
};

exports.editCategory = async (req, res) => {
  if (TokenUserDecrypt.fk_role == 2) {
    const id = +req.params.id;
    data_field = req.body.category;

    if (!(await findBy(Category, id))) {
      return res.status(401).json({
        message: "This category does not exist ",
      });
    }

    if (await findByCategory(Category, data_field)) {
      return res.status(401).json({
        message: "This category already exists ",
      });
    }

    Category.update(
      {
        category: data_field,
      },
      { where: { id: id } }
    )

      .then(() => res.json("message: Category updated"))
      .catch((err) =>
        res.status(500).json({ message: "Database Error", error: err })
      );
  } else {
    return res
      .status(401)
      .json({ message: "You are not allowed to access this route !" });
  }
};

exports.deleteCategory = async (req, res) => {
  if (TokenUserDecrypt.fk_role == 2) {
    User.findAll()
      .then((users) => res.json({ data: users }))
      .catch((err) =>
        res.status(500).json({ message: "Database Error", error: err })
      );
  } else {
    return res
      .status(401)
      .json({ message: "You are not allowed to access this route !" });
  }
};
