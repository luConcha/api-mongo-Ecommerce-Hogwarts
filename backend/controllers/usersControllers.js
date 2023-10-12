const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/usersModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, house } = req.body; //casaId
  if (!name || !email || !password || !house) {
    res.status(400);
    throw new Error('Datos de usuario no capturados');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('Usuario ya registrado');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    house,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      house: user.house,
    });
  } else {
    res.status(400);
    throw new Error('No se pudo registrar al usuario');
  }
  //res.status(201).json({ message: 'Registrar usuario' });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, house } = req.body;
  if (!email || !password || !house) {
    res.status(400);
    throw new Error('Credenciales no capturadas');
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      house: user.house,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Credenciales Incorrectas');
  }
});

const getUserData = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '60m' });
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
};
