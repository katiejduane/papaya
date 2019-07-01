var express = require("express");
var router = express.Router();

const withAuth = require("../middleware/withAuth");
const userController = require("../controllers/user");

// router.get('/splash', userController.getSplash)

router.post("/signup", userController.postSignUp);

router.post("/signin", userController.postSignIn);

router.get("/getNav", withAuth, userController.getNav);

router.get("/account", withAuth, userController.postAccount);

router.post("/account", withAuth, userController.postAccount);

router.get("/checkToken", withAuth, userController.checkToken);

module.exports = router;
