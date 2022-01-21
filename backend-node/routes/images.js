const express = require("express");
const router = express.Router();
const imagesController = require('../controllers/images'); 


router.get("/", imagesController.getAll); 
router.delete("/delete/:fileName", imagesController.deleteImage);

module.exports = router;