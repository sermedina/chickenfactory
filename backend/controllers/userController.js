const User = require("../models/User");

// Controlador para listar usuarios
const listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para crear un usuario
const createUser = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    const newUser = await User.create({ email, firstName, lastName, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para obtener un usuario específico
const getUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findByPk(email);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const { email } = req.params;
    const { firstName, lastName, password } = req.body;

    console.log(email)

    const [updated] = await User.update(
      { firstName, lastName, password },
      {
        where: { email },
      }
    );

    if (updated) {
      const updatedUser = await User.findByPk(email);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Controlador para eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const deleted = await User.destroy({
      where: { email },
    });
    if (deleted) {
      res.status(204).send("Usuario eliminado");
    } else {
      res.status(404).send("Usuario no encontrado");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Exportar todas las funciones como un objeto
module.exports = {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
