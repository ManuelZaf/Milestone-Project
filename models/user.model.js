const bcrypt = require("bcryptjs");
const mongodb = require('mongodb');

const db = require("../data/database.js");

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  static findById(userId){  //this created for the orders controller
    const uid = new mongodb.ObjectId(userId);
    return db.getDb().collection('users').findOne({_id:uid},{ projection: {password: 0}}); //by the first parameter are the data you want to receive,
    //and by the second with 0 the data can be excluded. The password has to be in a nested field because the findOne has a configuration object
    //which has a projection key. And this projection key holds the configuration key
    //The result is that in the orders collection in the database the password can't be written
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email }); /*findOne yields a promise and we return it
    That is why we haven't added async */
  }

  async existsAlready(){
    const existingUser = await this.getUserWithSameEmail();
    if(existingUser){
      return true;
    }
    return false;
  }

  /*define a method on this class
  to access the database we require the database.js file
  where the getDb is exported
  bcrypt.hash and insertOne create promises */
  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
  hasMatchingPassword(hashedPassword){
    return bcrypt.compare(this.password, hashedPassword);
  }
}



module.exports = User;
