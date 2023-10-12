const express = require('express');
const router = express.Router();

const { getHouses } = require('../controllers/housesControllers');

router.get('/', getHouses);

module.exports = router;
