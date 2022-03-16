const express = require('express');
const router = express.Router();

// @route GET reqrust api/profile/test
// @desc test profile route
// @acces public

router.get('/test', (req, res) => res.json({msg: "Profils works"}));

module.exports = router;