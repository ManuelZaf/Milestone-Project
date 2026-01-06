const path = require('path');
const express = require('express');

const db = require('./data/database');
const authRoutes = require('./routes/auth.routes')
//one dot means to look in the same folder

const app = express();

app.set('view engine', 'ejs'); //Activation of ejs package
app.set('views', path.join(__dirname, 'views')); //we use the path package to set up the ejs

app.use(express.static('public'));

app.use(authRoutes);

db.connectToDatabase().then(function(){
    app.listen(3000);
}).catch(function(error){
    console.log('Failed to connect to the database!')
    console.log(error);
});
//Only with successful connection to the database,
//the server can be started
//If not, we have an error