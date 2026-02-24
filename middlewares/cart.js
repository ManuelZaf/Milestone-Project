const Cart = require('../models/cart.model');

function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;
    cart = new Cart(sessionCart.items, sessionCart.totalQuantity, sessionCart.totalPrice);
  }

  res.locals.cart = cart; //make the cart available for this request responce cycle
  //in all the other middleware functions and my views

  next();
}

module.exports = initializeCart;
