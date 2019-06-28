const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

// sign up
module.exports.postSignUp = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    User.findOne({
        where: {
            email : email
        }
    })
    .then(user => {
        if(!user){
            User.create({
                firstname: firstname,
                lastname: lastname,
                email: email,
                hash: password
            })
            .then(response => {
                res.json(response)
            })
            .catch(err => console.log(err))
        } else {
            res.json({
                msg: 'User already exists!'
            })
        }
    })
    .catch(err => console.log(err))
    
}

// sign in
module.exports.postSignIn = (req, res, next) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    User.findOne({
        where: {
            email: email
        }
    })
    .then(function(user, err){
        if(err){
            console.log(err);
            res.status(500).json({
                error: 'Internal error please try again'  ,
                auth: false
            })
        } else if(!user){
            res.status(401).json({
                error: 'User email does not exist',
                auth: false
            })
        } else {
            user.authenticate(password,function(err, same){
            if (err) {
                res.status(500).json({
                    error: 'Internal error please try again',
                    auth: false
                });
            } else if(!same) {
                res.status(401).json({
                    error: 'That password is incorrect',
                    auth: false
                });
            } else {
                const token = jwt.sign(
                    {id: user.id},
                    config.secret,
                    {expiresIn: 3600}
                    //how can i access the above chunk of time?
                )
                res.json({
                    token: token,
                    expiresIn: 3600,
                    // above is just a temporary solution
                    msg: 'Welcome!',
                    user: user,
                    error: false,
                    auth: true})
                }
            });
        }
    })
    .catch(err => console.log(err))
};

//check token ============================== DON'T KNOW IF I NEED THIS ===============================
module.exports.checkToken = (req, res, next) => {
    const userId = req.user.id;
    User.findOne({
        where: {
            id: userId
        }
    }).then(user => {
        const token = jwt.sign(
            { id: user._id },
            config.jwtSecret,
            { expiresIn: 36000000 }
        );
        res.json({
            token: token,
            expiresIn: 3600,
            // above is just a temporary solution
            message: 'valid token',
            auth: true,
            user: user,
        });
    }).catch(err => console.log(err));
}

//get account info
module.exports.getAccount = (req, res, next) => {

}

//update account info
module.exports.postAccount = (req, res, next) => {

}