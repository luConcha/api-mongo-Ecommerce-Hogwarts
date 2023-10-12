const asyncHandler = require('express-async-handler');
const House = require('../models/housesModel');

const getHouses = asyncHandler(async (req, res) => {
  const houses = await House.find();
  res.status(200).json(houses);
});

module.exports = {
  getHouses,
};
