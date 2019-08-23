var express = require("express");
var router = express.Router();
var ProjectControllers = require("../controllers/project.controller");
router.get("/getProjectItem", ProjectControllers.project_item);
router.get("/getProjectList", ProjectControllers.project_list);
router.post("/editProject", ProjectControllers.project_edit);
router.post("/deleteProject", ProjectControllers.project_delete);

module.exports = router;
