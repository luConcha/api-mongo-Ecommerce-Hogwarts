const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body; //casaId
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Datos de usuario no capturados');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Usuario ya registrado');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email, //casaid
    });
  } else {
    res.status(400);
    throw new Error('No se pudo registrar al usuario');
  }
  //res.status(201).json({ message: 'Registrar usuario' });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body; //casaId
  if (!email || !password) {
    res.status(400);
    throw new Error('Credenciales no capturadas');
  }

  const user = await User.findOne({ email });
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Credenciales Incorrectas');
  }

  res.status(200).json({ message: 'Login User' });
};

const getUserData = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  getUserData,
};
