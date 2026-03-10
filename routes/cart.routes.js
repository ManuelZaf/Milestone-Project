const express = require('express');

const cartController = require('../controllers/cart.controller')
//I need to have the .. because the file I need to require is not in the same folder (Routes)

const router = express.Router();

router.get('/', cartController.getCart);  // /cart/

router.post('/items', cartController.addCartItem); // /cart/items...prefix setup in app.js

router.patch('/items', cartController.updateCartItem);

module.exports = router;