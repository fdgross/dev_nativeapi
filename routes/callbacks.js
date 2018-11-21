import CallbacksController from '../controllers/callbacks';

export default(app) => {
  const callbacksController = new CallbacksController(
    app.datasource.models.Callbacks,
    app.datasource.models.Profiles,
  );
  app.route('/callbacks')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      callbacksController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      callbacksController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/callbacks/:id')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      callbacksController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      callbacksController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      callbacksController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
