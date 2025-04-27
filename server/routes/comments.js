var express = require('express');
var router = express.Router();

const commentsController = require('../controllers/commentsController')

//create comment
router.post('/', commentsController.postCreateComm);

//get comments from posts
router.get('/', commentsController.getComm)

module.exports = router;