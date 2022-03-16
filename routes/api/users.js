const express = require('express');
const router = express.Router(); 

// @route GET reqrust api/users/test
// @desc test users route
// @acces public

router.get('/test', (req, res) => res.json({msg: "Users works"}));

module.exports = router;
