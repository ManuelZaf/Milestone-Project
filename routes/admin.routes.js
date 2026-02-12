const express = require('express');

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

router.get('/products', adminController.getProducts); ///admin/products

router.get('/products/new', adminController.getNewProduct);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdateProduct);
// id has a dynamic value

router.post('/products/:id', imageUploadMiddleware, adminController.updateProduct);
//we need the middleware to upload the image, since the form has enctype = multipart7form-data


module.exports = router;
