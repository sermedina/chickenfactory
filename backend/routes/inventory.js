const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");

// Definir rutas para inventario y asignar controladores
router.get("/", inventoryController.listItems);
router.post("/", inventoryController.createItem);
router.get("/:itemId", inventoryController.getItem);
router.put("/:itemId", inventoryController.updateItem);
router.delete("/:itemId", inventoryController.deleteItem);

// Exportar el router
module.exports = router;
