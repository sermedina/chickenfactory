const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const sequelize = require("./config/database");

// ... configuración de express y rutas

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Rutas
const userRoutes = require("./routes/users");
const inventoryRoutes = require("./routes/inventory");
const authRoutes = require("./routes/auth");

// Utilizar rutas
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/inventory", inventoryRoutes);

app.get("/status", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "Servidor levantado y funcionando!" });
});

// Manejador para rutas no definidas
app.use("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: "Esta ruta no existe.",
  });
});

// Sincronizar modelos con la base de datos
sequelize
  .sync({ force: true }) // Usa { force: true } solo para desarrollo, ya que borra la DB
  .then(() => {
    console.log("Base de datos y tablas creadas");
    // Aquí inicias el servidor express
    const PORT = process.env.PORT || 3500;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((err) => console.error("Error al sincronizar la base de datos", err));
