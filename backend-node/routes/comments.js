const express = require("express");
const router = express.Router();
const commentsController = require('../controllers/comments'); 


router.get("/", commentsController.getAll); 
router.post("/add", commentsController.addComment );

module.exports = router;