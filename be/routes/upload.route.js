var express = require('express');
var router = express.Router();
var UploadControllers = require('../controllers/upload.controller');
router.post('/upload',UploadControllers.upload);

module.exports = router;