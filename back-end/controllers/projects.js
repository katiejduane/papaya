const Project = require("../models/project");
const Type = require("../models/type");
const Status = require("../models/status");
const User = require("../models/user");

// loads home page (if logged in, eventually) with all CURRENT projects (archived/completed will not load at init)!
module.exports.getIndex = (req, res, next) => {
  const userId = req.user.id;
  Project.findAll({
    include: [
      { model: Type },
      { model: Status }
      // for the above, use 'attributes' to get only what you need from these models
    ],
    where: {
      userId: userId
    },
    order: [["updatedAt", "DESC"]]
  })
    .then(projects => {
      res.json(projects);
    })
    .catch(err => console.log(err));
};

// gets a single project to see details
module.exports.getProject = (req, res, next) => {
  console.log("get proj");
  const userId = req.user.id;
  const projId = req.params.projId;
  console.log("params", req.params);
  Project.findAll({
    include: [{ model: Type }, { model: Status }],
    where: {
      id: projId,
      userId: userId
    }
  })
    .then(project => {
      res.json(project);
    })
    .catch(err => console.log(err));
};

// gets types to load in 'select' drop down menu in add new project form
module.exports.getTypes = (req, res, next) => {
  userId = req.user.id;
  Type.findAll({
    where: { userId: userId }
  })
    .then(types => {
      res.json(types);
    })
    .catch(err => console.log(err));
};

// posts new project
module.exports.postNewProject = (req, res, next) => {
  const userId = req.user.id;
  const name = req.body.name;
  const type = req.body.type;
  const status = req.body.status;
  const notes = req.body.notes;
  console.log("NAME", name, "TYPE", type, "STATUS", status, "NOTES", notes);
  if (isNaN(parseInt(type))) {
    Type.create({ typename: type, userId: userId })
      .then(type => {
        Project.create({
          userId: userId,
          name: name,
          notes: notes,
          statusId: status,
          typeId: type.id
        })
          .then(response => {
            res.json(response);
          })
          .catch(err2 => console.log(err2));
      })
      .catch(err => console.log(err));
  } else {
    Project.create({
      userId: userId,
      name: name,
      notes: notes,
      statusId: status,
      typeId: type
    })
      .then(response => {
        res.json(response);
      })
      .catch(err2 => console.log(err2));
    // do i want to res.json the error to the FE so I can DO something with it (like display an error message?)
  }
};

// get project to update // AT THE MOMENT THIS IS THE SAME AS THE GET PROJECT BASIC, DO I NEED BOTH?
module.exports.getUpdateProject = (req, res, next) => {
  console.log("update");
  const userId = req.user.id;
  const projId = req.params.projId;
  Project.findAll({
    include: [{ model: Type }, { model: Status }],
    where: {
      id: projId,
      userId: userId
    }
  })
    .then(project => {
      res.json(project);
    })
    .catch(err => console.log(err));
};

// post updated project
module.exports.postUpdateProject = (req, res, next) => {};

// delete project
module.exports.deleteProject = (req, res, next) => {
  const projId = req.body.projectId;
  const userId = req.user.id;
  // above i might use req.params instead, idk yet
  Project.findByPk({
    where: {
      id: projId,
      userId: userId
    }
  })
    .then(project => {
      return project.destroy();
    })
    .then(result => {
      console.log("destroyed project");
      res.json(result);
    })
    .catch(err => console.log(err));
};

//view archived projects
// module.exports.getArchive = (req, res, next) => {
//   const userId = req.user.id;
//   Project.findAll({
//     include: [
//       { model: Type },
//       { model: Status }
//       // for the above, use 'attributes' to get only what you need from these models
//     ],
//     where: {
//       userId: userId,
//       statusId: [5, 6, 7]
//     },
//     order: [["updatedAt", "DESC"]]
//   })
//     .then(projects => {
//       res.json(projects);
//     })
//     .catch(err => console.log(err));
// };
