var express = require('express');
var router = express.Router();
const passport = require('passport');

//controller
const usersController = require('../controllers/usersController');


/* INDEX */
router.get('/', usersController.indexGet);


//users/register
router.get('/register', usersController.registerGet);
router.post('/register', usersController.registerPost);


//users/login
router.get('/login', usersController.loginGet);
router.post('/login', usersController.loginPost);


//users/protected
router.get('/protected', passport.authenticate('jwt', {session: false}), usersController.protectedGet);

module.exports = router;
