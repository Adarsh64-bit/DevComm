const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');    
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

//load Input vlidation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//load user model
const User = require('../../models/User');

// @route GET reqrust api/users/test
// @desc test users route
// @acces public

router.get('/test', (req, res) => res.json({msg: "Users works"}));

// @route POST reqrust api/users/register
// @desc  register user
// @acces public
router.post('/register', (req, res) => {

    const{ errors, isValid } = validateRegisterInput(req.body);
    //check primary validation
    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email: 'Email already exists'})
        } else{
            const avatar = gravatar.url(req.body.email, {
                s:'200', //size
                r:'pg', //rating
                d: 'mm' // default
            })

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });  
});

// @route GET reqrust api/users/login
// @desc  login user / return Jwt token
// @acces public
router.post('/login', (req, res) => {
    const{ errors, isValid } = validateLoginInput(req.body);
    //check primary validation
    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    //find user by email
    User.findOne({email})
        .then(user => {
            //check for user
            if(!user) {
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            //check password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        //res.json({msg: 'success generate token'});
                        //user matched

                        const paylaod = { id:user.id, name: user.name, avatar: user.avatar} // create jwt payload

                        //sign the token /documentation refer
                        jwt.sign(
                            paylaod, 
                            keys.secretOrKey, 
                            { expiresIn: 3600}, 
                            (err, token)=>{
                                res.json({
                                    sucess:true,
                                    token: 'Bearer ' + token
                                });
                            });
                    } else {
                        errors.password = 'Password incorrect'
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @route GET reqrust api/users/current
// @desc  return current user
// @acces private
router.get('/current', passport.authenticate('jwt', {session: false}), (req,res) => {
     res.json({
         id: req.user.id,
         name: req.user.name,
         email: req.user.email
     });
});

module.exports = router;
