const express = require('express');

const authController = require('../controllers/auth.controller')
//I need to have the .. because the file I need to require is not in the same folder (Routes)

const router = express.Router();


router.get('/signup', authController.getSignup);

router.get('/login', authController.getLogin);

module.exports = router;