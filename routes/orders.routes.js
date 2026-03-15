const express = require('express');

const ordersController = require('../controllers/orders.controller');
//I need to have the .. because the file I need to require is not in the same folder (Routes)

const router = express.Router();

router.post('/', ordersController.addOrder);  // /orders

router.get('/', ordersController.getOrders); // /orders

module.exports = router;