const Project = require('../models/project');
const Type = require('../models/type');
const Status = require('../models/status');

// loads home page (if logged in, eventually) with all projects, no filter!
exports.getIndex = (req, res, next) => {
    // const userId = req.body.id;
    Project.findAll({
        include:[ Type, Status ],
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
        include:[
            {model: Type},
            {model: Status}
        ],
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
    Type.findAll({
        where: {userId:1}
    })
    .then(types => {
        res.json(types)
    })
    .catch(err => console.log(err))
}

// exports.getStats = (req, res, next) => {
//     Status.findAll()
//         .then(stats => {
//             res.json(stats)
//         })
//         .catch(err => console.log(err))
// }


// posts new project
exports.postNewProject = (req, res, next) => {
    // console.log(req)
    uid = 1
    //why doesn't req.user work for me like it did for max? and it's not in the docs anywhere..?
    //will have to figure out the RIGHT way to pass and get the user id from the req (after i implement auth)
    const title = req.body.title;
    const type = req.body.type || req.body.newType;
    const status = req.body.status
    const statusColor = req.body.color
    const notes = req.body.notes;
    //also, i'm not sure this is the best way... could i do User.createProject() or something like that???
    if(typeof(type) == 'string'){
        Project.setType(type);
        Project.create({
            userId: uid,
            name: title,
            notes: notes,
            statusId: status
        })
    }else{
        Project.create({
        userId : uid,
        name: title,
        notes: notes,
        typeId: type,
        statusId: status
    })
    }
    return Project
    // .then(project => {
    //     project.setType({
    //         type
    //     })
    //     return project
    // })
    .then(response => {
        res.json(response)
    })
    .catch(err => console.log(err))
}

// update project
exports.updateProject = (req, res, next) => {

}

// delete project
exports.deleteProject = (req, res, next) => {

}