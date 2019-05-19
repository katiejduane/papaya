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

module.exports = router;
