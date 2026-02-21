const Cart = require('../models/cart.model');

function initializeCart() {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    cart = new Cart(req.session.cart.items);
  }

  res.locals.cart = cart; //make the cart available for this request responce cycle
  //in all the other middleware functions and my views

  next();
}

module.exports = initializeCart;
