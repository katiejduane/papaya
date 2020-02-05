var express = require("express");
var router = express.Router();

const withAuth = require("../middleware/withAuth");
const projectController = require("../controllers/projects");

// GET home page
router.get("/", withAuth, projectController.getIndex);

// GET types to load in dropdown menu
router.get("/addNew", withAuth, projectController.getTypes);

// GET types to load in Nav
router.get("/getTypes", withAuth, projectController.getTypes);

// POST a new project
router.post("/addNew", withAuth, projectController.postNewProject);

// GET the details of a project
router.get("/view/:projId", withAuth, projectController.getProject);

// // POST deleted project
router.post("/delete/:projId", withAuth, projectController.deleteProject);

// // GET project to edit
router.get("/update/:projId", withAuth, projectController.getProject);

// // POST project to edit
router.put("/update/:projId", withAuth, projectController.postUpdateProject);

// GET archived projects ---> killing this idea for now. might do later as an extra feature, but it's not on the mvp...
// router.get("/archive", withAuth, projectController.getArchive);

module.exports = router;
