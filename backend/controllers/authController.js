const User = require("../models/User");

// Controlador para hacer login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Buscar el usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Comparar la contraseña ingresada con la base de datos
    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    res.json({ message: "Login exitoso", user });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  login,
};
