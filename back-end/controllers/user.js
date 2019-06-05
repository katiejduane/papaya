const User = require('../models/user');


module.exports.postSignIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        where: {
            email: email
        }
    })
    .then(function(user, err){
        if(err){
            console.log(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'  
            })
        } else if(!user){
            res.json({
                msg: 'User email does not exist'
            })
        } else {
            user.authenticate(password,function(err, same){
            if (err) {
                res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
            } else if(!same) {
                res.status(401)
                .json({
                    msg: 'Bad password'
                });
            } else {
                console.log("hi", user)
                res.json(user)
            }
        });
    }
    })
    .catch(err => console.log(err))
}

module.exports.postSignUp = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
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
}

module.exports.getAccount = (req, res, next) => {

}

module.exports.postAccount = (req, res, next) => {

}