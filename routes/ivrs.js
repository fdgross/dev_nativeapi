import IvrsController from '../controllers/ivrs';

export default(app) => {
  const ivrsController = new IvrsController(
    app.datasource.models.Ivrs,
    app.datasource.models.IvrsDetails,
  );
  app.route('/ivrs')
    .all(app.auth.authenticate())
    .get((req, res) => {
      ivrsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      ivrsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode, req.user);
          res.json(response.data);
        });
    });

  app.route('/ivrs/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      ivrsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      ivrsController.update(req.body, req.params, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      ivrsController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
