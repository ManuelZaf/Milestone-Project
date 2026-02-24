const express = require('express');

const cartController = require('../controllers/cart.controller')
//I need to have the .. because the file I need to require is not in the same folder (Routes)

const router = express.Router();


router.post('/items', cartController.addCartItem); // /cart/items...prefix setup in app.js

module.exports = router;