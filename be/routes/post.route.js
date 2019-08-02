var express = require("express");
var router = express.Router();
var PostControllers = require("../controllers/post.controller");
router.get("/getPostItem", PostControllers.post_item);
router.get("/getPostList", PostControllers.post_list);
router.post("/editPost", PostControllers.post_edit);
router.post("/deletePost", PostControllers.post_delete);

module.exports = router;
