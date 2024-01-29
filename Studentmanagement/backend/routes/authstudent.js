const Auth = require("../controllers/studentauth.js")
var express = require('express'),
router = express.Router();

router.post('/login', Auth.Login)

module.exports = router;