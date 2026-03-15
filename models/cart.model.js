const Product = require ('./product.model');

class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    //We give a default value to items
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  async updatePrices() {
    const productIds = this.items.map(function (item) {
      //I want to find all the products where the product ID is one of the IDs specified in a given array.
      // 
      return item.product.id;
    });

    const products = await Product.findMultiple(productIds);

    const deletableCartItemProductIds = [];

    for (const cartItem of this.items) {
      const product = products.find(function (prod) {
        return prod.id === cartItem.product.id;
      });

      if (!product) {
        // product was deleted!
        // "schedule" for removal from cart
        deletableCartItemProductIds.push(cartItem.product.id);
        continue; //stops the loop?
      }

      // product was not deleted
      // set product data and total price to latest price from database
      cartItem.product = product;
      cartItem.totalPrice = cartItem.quantity * cartItem.product.price;
    }

    if (deletableCartItemProductIds.length > 0) {
      this.items = this.items.filter(function (item) { //drop or keep an item through the filter process
        return deletableCartItemProductIds.indexOf(item.product.id) < 0;
        // we’re filtering the cart items to remove any whose product ID appears in the array deletableCartItemProductIds.
        //If the product ID is NOT in the deletable list, indexOf returns -1, which is < 0, so the item is kept.
        // If the product ID IS in the deletable list, indexOf returns something like 0, 1, 2, etc., which is NOT < 0, so the item is filtered out.
      });
    }

    // re-calculate cart totals
    this.totalQuantity = 0;
    this.totalPrice = 0;

    for (const item of this.items) {
      this.totalQuantity = this.totalQuantity + item.quantity;
      this.totalPrice = this.totalPrice + item.totalPrice;
    }
  }

  addItem(product) {
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = +item.quantity + 1; //Update of the existing quantity of the existing item. The + to make it a number and avoid concat as a string
        cartItem.totalPrice = item.totalPrice + product.price; //Update of the existing total price of the existing item
        this.items[i] = cartItem; //Update of the existing item

        this.totalQuantity++; 
        this.totalPrice += product.price; //total price of the Item
        return;
      }
    }
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price; //totalPrice of the Cart
  }

  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === productId && newQuantity > 0) {
        const cartItem = {...item};
        const quantityChange = newQuantity -item.quantity;
        cartItem.quantity = newQuantity;
        cartItem.totalPrice = newQuantity * item.product.price;
        this.items[i] = cartItem; //Update of the existing item

        this.totalQuantity = this.totalQuantity + quantityChange;
        this.totalPrice += quantityChange * item.product.price;
        return {updatedItemPrice: cartItem.totalPrice}; //instead of returning nothing, we can return some data. in this case 
        //we return the total price of the item
      } else if (item.product.id === productId && newQuantity <= 0) {
        this.items.splice(i, 1);
        this.totalQuantity = this.totalQuantity - item.quantity;
        this.totalPrice -= item.totalPrice;
        return {updatedItemPrice: 0}; //we return 0, because we remove the item in the cart
      }
    }
    
  }
}


module.exports = Cart;