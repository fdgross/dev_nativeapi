import InternalRoutesController from '../controllers/internalRoutes';

export default(app) => {
  const inRoutesController = new InternalRoutesController(
    app.datasource.models.InternalRoutes,
    app.datasource.models.InternalRoutesDetails,
  );
  app.route('/internalRoutes')
    .all(app.auth.authenticate())
    .get((req, res) => {
      inRoutesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      inRoutesController.create(req.body, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/internalRoutes/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      inRoutesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      inRoutesController.update(req.body, req.params, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      inRoutesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
