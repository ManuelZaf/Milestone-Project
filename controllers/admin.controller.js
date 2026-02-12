const Product = require('../models/product.model');

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render('admin/products/all-products', { products: products });
  } catch (error) {
    next(error);
    return;
  }
}

function getNewProduct(req, res) {
  res.render('admin/products/new-product');
}

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error); //try,catch in case it fails
    return;
  }

  res.redirect('/admin/products');
}

async function getUpdateProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id); //params.id is used to extract the value
    //that was entered in the URL
    res.render('admin/products/update-product', { product: product });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) { //this function is triggered, if a POST request is being sent to admin.route
  const product = new Product({
    ...req.body, //the ... for all req.body fields
    _id: req.params.id
  });
  if(req.file){
    // replace the old image with the new one
    product.replaceImage(req.file.filename);
  }
  try{
    await product.save();
  } catch (error){
    next(error);
    return;
  }
  res.redirect('/admin/products');
  
} 

module.exports = {
  getProducts: getProducts,
  getNewProduct: getNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
};
