var express = require('express');
var router = express.Router();
var UserControllers = require('../controllers/user.controller');
router.post('/login',UserControllers.user_login);
router.post('/signup',UserControllers.user_signup);

module.exports = router;