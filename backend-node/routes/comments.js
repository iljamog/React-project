const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/comments'); 


router.get("/", commentsController.getAll); 

module.exports = router;