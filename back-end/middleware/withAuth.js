const config = require('../config');
const jwt = require('jsonwebtoken');

const withAuth = function (req, res, next) {
    // console.log(req.headers)
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['authorization'];
        req.cookies.token;
    if (!token) {
        console.log('middleware: no token', req.url)
        res.status(401).json({Unauthorized: 'No token provided'});
    } else {
        console.log('middleware: ', req.url, token)
        // console.log('headers in middleware', req.headers)
        jwt.verify(token, config.secret, function (err, user) {
            if (err) {
                console.log('err', err)
                res.status(401).json({Unauthorized: 'Invalid token'});
            } else {
                console.log('verify', user)
                req.user = user;
                next();
            }
        });
    }
}
module.exports = withAuth;


// another possibility for middleware
// //middleware that checks if JWT token exists and verifies it if it does exist.
// //In all the future routes, this helps to know if the request is authenticated or not.
// app.use(function (req, res, next) {
//     // check header or url parameters or post parameters for token
//     var token = req.headers['authorization'];
//     if (!token) return next(); //if no token, continue

//     token = token.replace('Bearer ', '');

//     jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//         if (err) {
//             return res.status(401).json({
//                 success: false,
//                 message: 'Please register Log in using a valid email to submit posts'
//             });
//         } else {
//             req.user = user; //set the user to req so other routes can use it
//             next();
//         }
//     });
// });