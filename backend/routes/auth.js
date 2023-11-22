const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.login);

// Exportar el router
module.exports = router;
