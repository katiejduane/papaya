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

// post updated project
module.exports.postUpdateProject = (req, res, next) => {
  const projId = req.params.projId;
  const userId = req.user.id;
  const name = req.body.name;
  const type = req.body.type;
  const status = req.body.status;
  const notes = req.body.notes;
  console.log(
    "UPDATING... NAME",
    name,
    "TYPE",
    type,
    "STATUS",
    status,
    "NOTES",
    notes
  );
  if (isNaN(parseInt(type))) {
    Type.create({ typename: type, userId: userId })
      .then(type => {
        Project.update(
          {
            userId: userId,
            name: name,
            notes: notes,
            statusId: status,
            typeId: type.id
          },
          { where: { id: projId } }
        )
          .then(response => {
            res.json(response);
          })
          .catch(err2 => console.log(err2));
      })
      .catch(err => console.log(err));
  } else {
    Project.update(
      {
        userId: userId,
        name: name,
        notes: notes,
        statusId: status,
        typeId: type
      },
      { where: { id: projId } }
    )
      .then(response => {
        res.json(response);
      })
      .catch(err2 => console.log(err2));
    // do i want to res.json the error to the FE so I can DO something with it (like display an error message?)
  }
};

// delete project
module.exports.deleteProject = (req, res, next) => {
  const projId = req.params.projId;
  const userId = req.user.id;
  // above i might use req.params instead, idk yet
  Project.destroy({
    where: {
      id: projId
      // userId: userId
    }
  })
    .then(result => {
      console.log("destroyed project");
      res.json(result);
    })
    .catch(err => console.log(err));
};

// const numAffectedRows = await Pug.destroy({
//   where: {
//     age: 7 // deletes all pugs whose age is 7
//   }
// });

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
