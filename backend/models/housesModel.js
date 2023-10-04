const mongoose = require('mongoose');

const houseSchema = mongoose.Schema(
  {
    house: {
      type: String,
      required: [true, 'Por favor ingrese una casa'],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model('House', houseSchema);
