const user = require("../models/user");

exports.getLogin = (req, res, next) => {
    // const isLoggedIn = req.get('Cookie').split(';')[5].trim().split('=')[1];
    console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    })
};


exports.postLogin = (req, res, next) => {
    user.findById('62dc12a39bf111bca32073de')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            })
        })
        .catch(err => console.log(err));
};


exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
};