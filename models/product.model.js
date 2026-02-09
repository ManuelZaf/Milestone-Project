const mongodb = require('mongodb');
const db = require('../data/database');

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price; // the plus is the value to be a number
    this.description = productData.description;
    this.image = productData.image; //the name of the image file
    this.imagePath = `product-data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
    if (productData._id) {
      // by new product _id is undefined, calling toString would fail
      this.id = productData._id.toString(); //convertion to string
    }
  }

  static async findById(productId) {
    let prodId;
    try {
      //try fpr ObjectId, if it fails then error 404
       prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db
      .getDb()
      .collection('products')
      .findOne({ _id: prodId });
    if (!product) {
      const error = new Error('Could not find product with provided id.');
      // Error is a built-in class in JS we're using to generate object with some internal error information
      error.code = 404;
      throw error;
    }
    return product;
  }

  static async findAll() {
    //static is for the class, not for the intance (object)!
    const products = await db.getDb().collection('products').find().toArray(); //we get back an array of product objects
    return products.map(function (productDocument) {
      return new Product(productDocument);
      /*    The productDocument is a local variable. It does not exist outside the function
    We need the map method to loop over the array and for each element we take,
    we put it into the parameter of the function --> run the function, which creates a Product from the class above,
    return the value into a new array, which is returned as an output of the function findAll()
     */
    });
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };
    await db.getDb().collection('products').insertOne(productData);
  }
}

module.exports = Product;
