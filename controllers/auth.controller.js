const User = require('../models/user.model');
//class User is here available
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
function getSignup(req, res) {
  res.render('customer/auth/signup');
}

async function signup(req, res, next) {
  

  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city,
    ) || !validation.emailIsConfirmed(req.body.email, req.body['confirm-email']) //other syntax because of the - in the name of confirm-email
  ) {
    res.redirect('/signup');
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city,
  );
  //we create a concrete instance of a User blueprint

  

  try {
    const existsAlready = await user.existsAlready(); //checks for existing user
  if(existsAlready){
    res.redirect('/signup');
    return;
  }
    await user.signup(); /* We call the signup method, which is defined
  to store that user in the database.
  the signup method returns a promise */
  } catch (error) {
    next(error);
    /*When we pass an error to next and we execute next with that error
    the default error handling middleware will become active.
    */
    return;
  }

  res.redirect('/login');
}

function getLogin(req, res) {
  res.render('customer/auth/login');
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  let existingUser; //We define here the variable, so that it is available in the try block
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    res.redirect('/login');
    return;
  }
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password,
  );

  if (!passwordIsCorrect) {
    res.redirect('/login');
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect('/'); //This will be executed, only when the session is saved
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect('/login');
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
