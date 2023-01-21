const express = require("express");
const adressController = require("../controllers/adress");

let router = express.Router();

router.use((req, res, next) => {
  const event = new Date();
  console.log("User Time:", event.toString());
  next();
});

router.get("/me", adressController.getMe);

router.put("/:id", adressController.updateAdress);

http: module.exports = router;
