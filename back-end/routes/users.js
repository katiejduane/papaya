var express = require("express");
var router = express.Router();

const withAuth = require("../middleware/withAuth");
const userController = require("../controllers/user");

// router.get('/splash', userController.getSplash)

router.post("/signup", userController.postSignUp);

router.post("/signin", userController.postSignIn);

router.get("/account", withAuth, userController.postAccount);

router.post("/account", withAuth, userController.postAccount);

router.get("/checkToken", withAuth, userController.checkToken);
//need a way to handle log out if token is expired!! (current issue)

router.post("/signout", userController.signOut);
// do i need to send the above with auth middleware? experiment and find out! :)
// something with this is not working...

module.exports = router;
