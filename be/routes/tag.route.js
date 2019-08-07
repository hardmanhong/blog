var express = require('express');
var router = express.Router();
var TagControllers = require('../controllers/tag.controller');
router.get('/getTagList',TagControllers.tag_list);
router.post('/editTag',TagControllers.tag_edit);
router.post('/deleteTag',TagControllers.tag_delete);

module.exports = router;