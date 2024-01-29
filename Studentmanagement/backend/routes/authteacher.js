const Auth = require("../controllers/teacherauth")
var express = require('express'),
router = express.Router();

router.post('/login', Auth.Login)

module.exports = router;