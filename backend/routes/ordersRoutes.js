const express = require('express');
const router = express.Router();

const {
  registerOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/ordersControllers');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, registerOrder);
router.get('/', protect, getOrders);
router.put('/:id', protect, updateOrder);
router.delete('/:id', protect, deleteOrder);

module.exports = router;
