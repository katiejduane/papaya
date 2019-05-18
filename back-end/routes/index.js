var express = require('express');
var router = express.Router();

const listController = require('../controllers/list');

/* GET home page. */
router.get('/', listController.getIndex);

module.exports = router;
