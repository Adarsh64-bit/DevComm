const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const passport = require('passport');
// post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

//validation
const validatePostInput = require('../../validation/post');

// @route GET reqrust api/posts/test
// @desc test post route
// @acces public
router.get('/test', (req, res) => res.json({msg: "posts works"}));

// @route GET api/posts
// @desc get posts
// @acces public
router.get('/', (req,res) => {
    Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopostsfound: ' No posts found with that id'}));  
});

// @route GET api/posts/:id
// @desc get post by id
// @acces public
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopostfound: ' No post found with that id'}));  
});

// @route POST api/posts
// @desc crate post 
// @acces private
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) =>{
    const { errors, isValid} = validatePostInput(req.body);

    //check validation
    if(!isValid) {
        //if any errors sedn 400 with errors obj
        return res.status(400).json(errors);
    }
    
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save().then(post => res.json(post));
} );

// @route DELETE api/posts/:id
// @desc delete post by id
// @acces private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
     Profile.findOne({user: req.user.id})
     .then(profile => {
         Post.findById(req.params.id)
         .then(post => {
             //check for post owener, so can delete
             if(post.user.toString() !== req.user.id) {
                 return res.status(401).json({notauthorized: 'User not authorized'});
             }

             // delete
             post.remove().then(() => res.json({success:true}));
         })
         .catch(err => res.status(404).json({postnotfound: 'No post found'}));
     })
});

module.exports = router;