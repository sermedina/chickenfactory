const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Definir rutas para usuarios y asignar controladores
router.get("/", userController.listUsers);
router.post("/", userController.createUser);
router.get("/:email", userController.getUser);
router.put("/:email", userController.updateUser);
router.delete("/:email", userController.deleteUser);

// Exportar el router
module.exports = router;
