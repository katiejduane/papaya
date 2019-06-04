var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');

router.get('/', userController.getAccount);

router.post('/signin', userController.postSignIn);

router.post('/signup', userController.postSignUp);

router.get('/account', userController.postAccount);

router.post('/account', userController.postAccount);

module.exports = router;
