const express = require('express');
const router = express.Router();

const {
  registerOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/ordersControllers');

router.post('/', registerOrder);
router.get('/', getOrders);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;
