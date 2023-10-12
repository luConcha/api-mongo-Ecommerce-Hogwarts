const express = require('express');

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  getProductsByHouseId,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsControllers');

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/house/:id', getProductsByHouseId);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
