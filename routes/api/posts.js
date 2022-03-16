const express = require('express');
const router = express.Router(); 
// @route GET reqrust api/posts/test
// @desc test post route
// @acces public

router.get('/test', (req, res) => res.json({msg: "posts works"}));

module.exports = router;