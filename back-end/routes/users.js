var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');

const userController = require('../controllers/user');

router.get('/', userController.getAccount);

// router.get('/signin', userController.getSignIn);

// router.post('/signin', userController.postSignIn);

// router.get('/signp', userController.getSignUp);

router.post('/signup', userController.postSignUp);

router.post('/account', userController.postAccount);

module.exports = router;
