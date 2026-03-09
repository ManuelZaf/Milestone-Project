const Product = require('../models/product.model');


function getCart(req, res){
  res.render('customer/cart/cart');
  //We don't need to pass any data to that render method because the only data we use is accessed with locals key
  //which is available anyways, in all views. That is the idea behind res.locals.
}

async function addCartItem(req, res, next) {
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

function updateCartItem (req, res) {
  const cart = res.locals.cart;
  

  
  const updatedItemData = cart.updateItem(req.body.productId, req.body.quantity);//method from cart.model.js
  //updateItem method expects the productId and the newQuantity
  //in this constant we write the returned data


  req.session.cart = cart; //I overwrite the cart data in my session, not in res.locals

  res.json({  //This updateCart action should be invoked by requests that are sent as AJAX request
    //therefore we send back a json response
    message: 'Item updated',
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice //updatedItemPrice is the key in the cart.model.js, in the returned data
    },
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem
};
