const path = require('path');
const express = require('express');
const csrf = require('csurf');
const expressSession = require('express-session');

const createSessionConfig = require('./config/session');
const db = require('./data/database');
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const authRoutes = require('./routes/auth.routes');
//one dot means to look in the same folder
const productRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');


const app = express();

app.set('view engine', 'ejs'); //Activation of ejs package
app.set('views', path.join(__dirname, 'views')); //we use the path package to set up the ejs

app.use(express.static('public'));
app.use('/products/assets', express.static('product-data')); //like in the routes the first parameter is a filter
app.use(express.urlencoded({ extended: false }));

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));

app.use(csrf()); //middleware to add CSRF package
app.use(cartMiddleware);
app.use(addCsrfTokenMiddleware); /*the custom middleware using the CSRF package
We don't execute the custom middleware. It is available for express to execute it*/
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);
app.use(protectRoutesMiddleware);
app.use('/admin', adminRoutes); //With /admin parameter only paths with /admin
//will make it into the adminRoutes 

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log('Failed to connect to the database!');
    console.log(error);
  });
/*Only with successful connection to the database,
the server can be started
If not, we have an error*/
