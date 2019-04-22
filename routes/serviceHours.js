import ServiceHoursController from '../controllers/serviceHours';

export default(app) => {
  const serviceHoursController = new ServiceHoursController(
    app.datasource.models.ServiceHours,
    app.datasource.models.ServiceHoursDetails,
    app.datasource.models.Queues,
    app.datasource.models.Ivrs,
  );
  app.route('/serviceHours')
    .all(app.auth.authenticate())
    .get((req, res) => {
      serviceHoursController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      serviceHoursController.create(req.body, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/serviceHours/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      serviceHoursController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      serviceHoursController.update(req.body, req.params, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      serviceHoursController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
