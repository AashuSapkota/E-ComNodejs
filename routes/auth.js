const express = require('express');

const authController = require('../controllers/auth')
const { check, body } = require('express-validator');
const User = require('../models/user');


const router = express.Router();


router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login',
    [
        body('email')
        .isEmail()
        .normalizeEmail(),
        body('password')
        .isStrongPassword()
        .trim(),
    ],
    authController.postLogin
);

router.post(
    '/signup',
    [
        check('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, {req}) => {
            return User.findOne({email: value})
            .then(userDoc => {
                if (userDoc){
                    return Promise.reject('User with same email already exists!!');
                }
            });
        })
        .normalizeEmail(),
        body('password', 'Your password is not strong enough!!')
        .isStrongPassword()
        .trim(),
        body('confirmPassword')
        .trim()
        .custom((value, {req})=> {
            console.log(value);
            console.log(req.body.password);
            console.log(value === req.body.password);
            if(value !== req.body.password){
                console.log("don't")
                throw new Error("Password Doesn't Matches");
            }
            console.log('do match')
            return true;
        })
        
    ],
    authController.postSignup)
;

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);


module.exports = router;