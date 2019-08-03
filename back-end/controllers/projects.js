const Project = require("../models/project");
const Type = require("../models/type");
const Status = require("../models/status");
const User = require("../models/user");

// loads home page (if logged in, eventually) with all projects, no filter!
module.exports.getIndex = (req, res, next) => {
  const userId = req.user.id;
  Project.findAll({
    include: [
      { model: Type },
      { model: Status }
      // for the above, use 'attributes' to get only what you need from these models
    ],
    where: {
      userId: userId,
      statusId: [1, 2, 3, 4]
    },
    order: [["updatedAt", "DESC"]]
  })
    .then(projects => {
      res.json(projects);
      // console.log(projects)
    })
    .catch(err => console.log(err));
};

// gets a single project to see details
module.exports.getProject = (req, res, next) => {
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
      // return project;
      // console.log(project)
      res.json(project);
    })
    .catch(err => console.log(err));
};

// allows the user to filter the projects by type
module.exports.filterByType = (req, res, next) => {};

// allows the user to filter the projects by status
module.exports.filterByStatus = (req, res, next) => {};

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
  // console.log(req)
  const userId = req.user.id;
  //why doesn't req.user work for me like it did for max? and it's not in the docs anywhere..?
  //will have to figure out the RIGHT way to pass and get the user id from the req (after i implement auth)
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

    //also, i'm not sure this is the best way... could i do User.createProject() or something like that???
    //i need to handle the condition for when  a user sends back a NEW TYPE (string, not an int!)
  }
};

// get project to update
module.exports.getUpdateProject = (req, res, next) => {};

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
      // this will likely have to change...will need to redirect back to list component
      // so do i even need to res these results?
    })
    .catch(err => console.log(err));
};

// view projects by status
module.exports.filterByStatus = (req, res, next) => {
  // const userId = 1
  const statusId = "";
  Project.findAll({
    include: [{ model: Type }, { model: Status }],
    where: {
      userId: userId,
      statusId: statusId
    }
  });
};

//view projects by type
module.exports.filterByType = (req, res, next) => {
  // const userId = 1
  const typeId = "";
  Project.findAll({
    include: [{ model: Type }, { model: Status }],
    where: {
      userId: userId,
      typeId: typeId
    }
  });
};

//view archived projects
module.exports.getArchive = (req, res, next) => {
  const userId = 1;
  Project.findAll({
    include: [{ model: Type }, { model: Status }],
    where: {
      userId: userId,
      statusId: [5, 6, 7]
    },
    order: [["updatedAt", "DESC"]]
  })
    .then(projects => {
      res.json(projects);
      // console.log(projects)
    })
    .catch(err => console.log(err));
};
