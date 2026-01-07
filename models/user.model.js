const  bcrypt = require('bcryptjs');

const db = require('../data/database.js');

class User {
    constructor(email, password, fullname, street, postal, city){
        this.email = email;
        this.password = password;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city
        };
    }
    //define a method on this class
    //to access the database we require the database.js file
    //where the getDb is exported
    //bcrypt.hash and insertOne create promises
    async signup(){
        const hashedPassword = await bcrypt.hash(this.password, 12);

       await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            name: this.name,
            address: this.address
        });
    }
}


module.exports = User;