const express = require("express");
const userController = require("../controllers/user");

let router = express.Router();

router.use((req, res, next) => {
  const event = new Date();
  console.log("User Time:", event.toString());
  next();
});

router.get("/me", userController.getMe);

router.get("/me_without_adress", userController.getMeWithoutAdress);

router.get("/users", userController.getAllUsers);

router.put("/user", userController.addUser);

router.get("/user/:id", userController.getUser);

router.patch("/user/:id", userController.updateUser);

router.patch("/user_with_adress/:id", userController.updateUserWithAdress);

router.post("/untrashUser/:id", userController.untrashUser);

router.delete("/trashUser/:id", userController.trashUser);

router.delete("/user/:id", userController.deleteUser);

module.exports = router;
