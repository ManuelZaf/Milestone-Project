const bcrypt = require("bcryptjs");

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

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email }); /*findOne yields a promise and we return it
    That is why we haven't added async */
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
