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
        cartItem.totalPrice = newQuantity * product.price;
        this.items[i] = cartItem; //Update of the existing item

        this.totalQuantity = this.totalQuantity + quantityChange;
        this.totalPrice += quantityChange * product.price;
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