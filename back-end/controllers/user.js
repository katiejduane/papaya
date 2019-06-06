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
            res.json({
                msg: 'User email does not exist',
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
                res.json({
                    msg: 'That password is incorrect',
                    auth: false
                });
            } else {
                const token = jwt.sign(
                    {id: user.id},
                    config.secret,
                    {expiresIn: 3600}
                )
                res.json({
                    token,
                    user: user,
                    auth: true})
                }
            });
        }
    })
    .catch(err => console.log(err))
};

//get account info
module.exports.getAccount = (req, res, next) => {

}

//update account info
module.exports.postAccount = (req, res, next) => {

}