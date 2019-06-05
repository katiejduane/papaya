var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.postSignUp);

router.post('/signin', userController.postSignIn);

router.get('/account', userController.postAccount);

router.post('/account', userController.postAccount);

module.exports = router;
