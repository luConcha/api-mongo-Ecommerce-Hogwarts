const Order = require('../models/ordersModel');

const registerOrder = async (req, res) => {
  const { product, user, amount } = req.body;

  const data = { product, user, amount };

  const order = new Order(data);
  await order.save();

  if (order) {
    res.status(201).json({
      message: 'Pedido Registrado',
      _id: order._id,
    });
  } else {
    res.status(400);
    throw new Error('No se pudo registrar el pedido');
  }
};
const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json(orders);
};

const updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Pedido no encontrada');
  }

  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedOrder);
};
const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error('Pedido no encontrada');
  }

  order.deleteOne();
  res.status(200).json({ id: order._id });
};

module.exports = {
  registerOrder,
  getOrders,
  updateOrder,
  deleteOrder,
};
