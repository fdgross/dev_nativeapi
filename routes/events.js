import EventsController from '../controllers/events';

export default(app) => {
  const featuresController = new EventsController(
    app.datasource.models.Events,
    app.datasource.models.Queues,
    app.datasource.models.Ivrs,
  );
  app.route('/events')
    .all(app.auth.authenticate())
    .get((req, res) => {
      featuresController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      featuresController.create(req.body, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/events/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      featuresController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      featuresController.update(req.body, req.params, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      featuresController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
