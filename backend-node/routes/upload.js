const express = require("express");
const router = express.Router();
const uploadController = require('../controllers/upload'); // STORING IN MONGO
const uploadMiddleware = require('../middleware/upload'); // STORING LOCALLY


router.post("/upload", uploadMiddleware.send ,uploadController.uploadFiles ); 

module.exports = router;