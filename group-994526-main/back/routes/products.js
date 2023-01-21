const express = require('express')
const productController = require('../controllers/product')
const checkTokenMiddleware = require('../jsonwebtoken/check')
const upload = require('../controllers/uploadfile')

const router = express.Router()

// /product/create [Post] => créer un produit et l'associe à l'utilisateur connecté
router.post('/create', checkTokenMiddleware, productController.createProduct) 

// /product/ [Get] => récupère les infos d'un produit
router.get('/:id([0-9]+)', productController.getProductById)

// /product/ [Put] => modifie les infos d'un produit
router.put('/:id([0-9]+)', checkTokenMiddleware, productController.editProduct)

// /product/ [Delete] => supprime les infos d'un produit
router.delete('/:id([0-9]+)', checkTokenMiddleware, productController.deleteProduct)

// /products [Get] => récupère tous les produits existants
router.get('/all_products', productController.getAllProducts)

// /products/:id [Get] => récupère tous les produits existants concernant un utilisateur
router.get('/products_user/:id([0-9]+)', productController.getProductsByUser) // get all products by user

router.get('/category/:id', productController.getProductsByCategory) // get all products by category

router.post('/upload', upload.single('file'), productController.uploadImage) // upload image

module.exports = router