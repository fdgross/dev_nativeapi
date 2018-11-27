import OutRoutesController from '../controllers/outRoutes';

export default(app) => {
  const outRoutesController = new OutRoutesController(
    app.datasource.models.OutRoutes,
    app.datasource.models.OutRoutesDetails,
    app.datasource.models.OutRoutesOverflows,
  );

  app.route('/outRoutes')
    .all(app.auth.authenticate())
    .get((req, res) => {
      outRoutesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      outRoutesController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/outRoutes/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      outRoutesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      outRoutesController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      outRoutesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
