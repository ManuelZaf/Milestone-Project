const express = require('express');

const authController = require('../controllers/auth.controller')
//I need to have the .. because the file I need to require is not in the same folder (Routes)

const router = express.Router();


router.get('/signup', authController.getSignup);

router.post('/signup', authController.signup);

router.get('/login', authController.getLogin);

router.post('/login', authController.login);
//We are able to send post requests there and trigger our authentication

module.exports = router;