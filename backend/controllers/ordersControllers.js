const asyncHandler = require('express-async-handler');
const Order = require('../models/ordersModel');

const registerOrder = asyncHandler(async (req, res) => {
  const { product, user, amount } = req.body;

  const data = { product, user, amount };

  const order = new Order(data);
  await order.save();

  if (order) {
    res.status(201).json({
      message: 'Pedido Registrado',
      _id: order._id,
      user: req.user.id,
    });
  } else {
    res.status(400);
    throw new Error('No se pudo registrar el pedido');
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json(orders);
});

const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Pedido no encontrada');
  }

  if (order.user.toString() != req.user.id) {
    res.status(401);
    throw new Error('Acceso no autorizado');
  } else {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedOrder);
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Pedido no encontrada');
  }

  if (order.user.toString() != req.user.id) {
    res.status(401);
    throw new Error('Acceso no autorizado');
  } else {
    order.deleteOne();
    res.status(200).json({ id: order._id });
  }
});

module.exports = {
  registerOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
