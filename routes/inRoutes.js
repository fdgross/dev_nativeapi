import InRoutesController from '../controllers/inRoutes';

export default(app) => {
  const inRoutesController = new InRoutesController(
    app.datasource.models.InRoutes,
    app.datasource.models.InRoutesDetails,
    app.datasource.models.Trunks,
  );
  app.route('/inRoutes')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      inRoutesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      inRoutesController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/inRoutes/:id')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      inRoutesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      inRoutesController.update(req.body, req.params)
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
