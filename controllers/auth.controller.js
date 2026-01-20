const User = require('../models/user.model');
//class User is here available
const authUtil = require('../util/authentication');
const validation = require('../util/validation');
const sessionFlash = require('../util/session-flash');

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if(!sessionData){
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: ''
    };
  }

  res.render('customer/auth/signup', {inputData: sessionData});
}

async function signup(req, res, next) {
  const enteredData =  {
      email: req.body.email,
      confirmEmail: req.body['confirm-email'],
      password: req.body.password,
      fullname: req.body.fullname,
      street: req.body.street,
      postal: req.body.postal,
      city: req.body.city
  }
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body['confirm-email']) //other syntax because of the - in the name of confirm-email
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          'Please check your input. Password must be at least 6 characters long, postal code must be 5 characters long.',
          ...enteredData,
      },
      function () {
        res.redirect('/signup');
      },
    );

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
    if (existsAlready) {
      sessionFlash.flashDataToSession(req,{
        errorMessage: 'User exists already! Try logging in instead!',
        ...enteredData,
        
      },
         function(){
        res.redirect('/signup');
      });
      
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
  let sessionData = sessionFlash.getSessionData(req);

  if(!sessionData){
    sessionData = {
      email: '',
      password: ''
    };
  }
  res.render('customer/auth/login', {inputData: sessionData});
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

  const sessionErrorData ={
      errorMessage: 'Invalid credentials - please double-check your email and password!',
      email: user.email,
      password: user.password //The data were stored in the User
    };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData , 
      function(){
    res.redirect('/login');
    });
    
    return;
  }
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password,
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData , 
      function(){
    res.redirect('/login');
    });
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
