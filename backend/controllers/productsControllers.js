const asyncHandler = require('express-async-handler');
const Product = require('../models/productsModel');

const createProduct = asyncHandler(async (req, res) => {
  const { name, description, image, amount, price, house } = req.body; //casaId
  const data = { name, description, image, amount, price, house };
  if (!name || !amount || !price || !house) {
    res.status(400);
    throw new Error('Capturar datos requeridos');
  }

  const productExists = await Product.findOne({ name });
  if (productExists) {
    res.status(400);
    throw new Error('Producto con el mismo nombre ya existe.');
  }

  const product = new Product(data);
  await product.save();

  if (product) {
    res.status(201).json({
      message: 'Producto Registrado',
      _id: product._id,
      name: product.name,
      house: product.house,
    });
  } else {
    res.status(400);
    throw new Error('No se pudo registrar el producto');
  }
});

const getProducts = asyncHandler(async (req, res) => {
  const queryParam = { active: true };
  const products = await Product.find(queryParam);
  res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
});

const getProductsByHouseId = asyncHandler(async (req, res) => {
  const queryParam = { house: req.params.id };
  const products = await Product.find(queryParam);
  res.status(200).json(products);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updateProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const falseActive = { active: false };
  const product = await Product.findByIdAndUpdate(id, falseActive);

  res.status(200).json({ message: `Producto ${id} fue eliminado`, product });
});

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  getProductsByHouseId,
  updateProduct,
  deleteProduct,
};
