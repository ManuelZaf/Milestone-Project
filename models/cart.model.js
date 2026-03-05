class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    //We give a default value to items
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }

  addItem(product) {
    console.log('123');
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };

    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
        cartItem.quantity = item.quantity + 1; //Update of the existing quantity of the existing item
        cartItem.totalPrice = item.totalPrice + product.price; //Update of the existing total price of the existing item
        this.items[i] = cartItem; //Update of the existing item

        this.totalQuantity++;
        this.totalPrice += product.price; //
        return;
      }
    }
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }
}


module.exports = Cart;