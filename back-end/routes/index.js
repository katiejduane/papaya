var express = require('express');
var router = express.Router();

const projectController = require('../controllers/projects');

// GET home page
router.get('/', projectController.getIndex);

// GET types to load in dropdown menu
router.get('/addNew', projectController.getTypes);

// POST a new project
router.post('/addNew', projectController.postNewProject);

// GET the details of a project
router.get('/view/:projId', projectController.getProject);

// // POST deleted project
// router.post('/delete/:projId', projectController.deleteProject);

// // GET project to edit
// router.get('/update/:projId', projectController.getUpdateProject);

// // POST project to edit 
// router.post('/update:projId', projectController.postUpdateProject);

// // GET projects in list by STATUS
// router.get('/view/:statusId', projectController.getByStatus);

// // GET projects in list by TYPE
// router.get('/view/:typeId', projectController.getByType);

// GET archived projects
router.get('/archive', projectController.getArchive);



module.exports = router;
