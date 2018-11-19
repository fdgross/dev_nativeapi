import PermissionsController from '../controllers/permissions';

export default(app) => {
  const permissionsController = new PermissionsController(app.datasource.models.Permissions);
  app.route('/permissions')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      permissionsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/permissions/:id')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      permissionsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};
