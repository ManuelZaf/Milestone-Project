const multer = require('multer');
const uuid = require('uuid').v4;

const upload = multer({
    storage: multer.diskStorage({
        destination: 'product-data/images',
        filename: function(req, file, cb){
            cb(null, uuid() + '-' + file.originalname);
        }
    })
});

const configuredMulterMiddleware = upload.single('image');
//image is the name we assigned in the new-product.ejs to this input


module.exports = configuredMulterMiddleware;