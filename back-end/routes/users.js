var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const userController = require('../controllers/user');

router.get('/', userController.getAccount);

// not sure if i will use two separate routes for signup/sign in or just one for auth and
// conditionally render

// router.get('/signIn', userController.getSignIn);

// router.post('/signIn', userController.postSignIn);

// router.get('/signUp', userController.getSignUp);

// router.post('/signUp', userController.postSignUp);

router.post('/account', userController.postAccount);

module.exports = router;
