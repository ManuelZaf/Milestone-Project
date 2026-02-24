const Product = require('../models/product.model');

async function addCartItem(req, res) {
  let product;
  try {
    product = await Product.findById(req.body.productId); //POST requests have a body
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart; //I overwrite the cart data in my session, not in res.locals


  res.status(201).json({
    message: 'Cart updated',
    newTotalItems: cart.totalQuantity
  });
  //We set a status code, which is a success status code
}

module.exports = {
  addCartItem: addCartItem,
};
