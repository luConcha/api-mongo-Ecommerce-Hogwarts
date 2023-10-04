const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor ingrese el nombre del Producto'],
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, 'Por favor ingrese la cantidad'],
  },
  price: {
    type: Number,
    required: [true, 'Por favor ingrese el precio'],
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Product', productSchema);
