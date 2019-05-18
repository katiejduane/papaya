const Project = require('../models/project');

exports.getIndex = (req, res, next) => {
    Project.findAll({
        where: {
            uid: 1
        }
    })
    .then(projects => {
        res.json(projects)
        console.log(projects)
    })
    .catch(err => console.log(err))
};