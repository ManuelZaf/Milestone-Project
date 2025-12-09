const path = require('path');
const express = require('express');

const authRoutes = require('./routes/auth.routes')
//one dot means to look in the same folder

const app = express();

app.set('view engine', 'ejs'); //Activation of ejs package
app.set('views', path.join(__dirname, 'views')); //we use the path package to set up the ejs

app.use(express.static('public'));

app.use(authRoutes);

app.listen(3000);