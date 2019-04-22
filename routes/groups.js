import GroupsController from '../controllers/groups';

export default(app) => {
  const groupsController = new GroupsController(app.datasource.models.Groups);
  app.route('/groups')
    .all(app.auth.authenticate())
    .get((req, res) => {
      groupsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      groupsController.create(req.body, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/groups/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      groupsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      groupsController.update(req.body, req.params, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      groupsController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
