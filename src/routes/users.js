const express = require("express");

const router = express.Router();
const userController = require("../controller/users");
router.get("/", userController.getAllUser);
router.get("/id=:idUser", userController.getUserById);
router.patch("/update/id=:idUser", userController.patchUpdateUser);
router.post("/login", userController.loginUser);
router.post("/add", userController.postAddUser);
module.exports = router;
