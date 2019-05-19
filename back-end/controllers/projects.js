const Project = require('../models/project');
const Type = require('../models/type');

// loads home page (if logged in, eventually) with all projects, no filter!
exports.getIndex = (req, res, next) => {
    // const userId = req.body.id;
    Project.findAll({
        include:[{
            model: Type
        }],
        where: {
            userId: 1
        }
    })
    .then(projects => {
        res.json(projects)
        // console.log(projects)
    })
    .catch(err => console.log(err))
};

// gets a single project to see details
exports.getProject = (req, res, next) => {
    const projId = req.params.projId;
    Project.findAll({
        include:[{
            model: Type}],
        where: {
            id: projId}
        })
        .then(project => {
            // return project;
            // console.log(project)
            res.json(project)
        })
        .catch(err => console.log(err))

}

// allows the user to filter the projects by type
exports.filterByType = (req, res , next) => {

}

// allows the user to filter the projects by status
exports.filterByStatus = (req, res, next) => {

}

// gets types to load in 'select' drop down menu in add new project form
exports.getTypes = (req, res, next) => {
    req.user
    .getTypes()
    .then(types => {
        res.json(types)
        console.log(types)
    })
    .catch(err => console.log(err))
}

// posts new project
exports.postNewProject = (req, res, next) => {

}

// update project
exports.updateProject = (req, res, next) => {

}

// delete project
exports.deleteProject = (req, res, next) => {

}