const express = require("express");
const categoryController = require("../controllers/category");
const checkTokenMiddleware = require("../jsonwebtoken/check");

const router = express.Router();

// /categorys [Get] => récupère tous les categories existants
router.get("/all", categoryController.getCategories);

// /category/create [Post] => créer une categorie
router.post("", checkTokenMiddleware, categoryController.createCategory);

// /category/ [Put] => modifie les infos d'une categorie
router.put(
  "/:id([0-9]+)",
  checkTokenMiddleware,
  categoryController.editCategory
);

// /category/ [Delete] => supprime les infos d'une categorie
router.delete(
  "/:id([0-9]+)",
  checkTokenMiddleware,
  categoryController.deleteCategory
);

module.exports = router;
