var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAccount);

router.get('/signIn', userController.getSignIn);

router.post('/signIn', userController.postSignIn);

router.get('/signUp', userController.getSignUp);

router.post('/signUp', userController.postSignUp);

router.post('/account', userController.postAccount);

module.exports = router;
