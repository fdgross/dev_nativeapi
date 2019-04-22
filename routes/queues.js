import QueuesController from '../controllers/queues';

export default(app) => {
  const queuesController = new QueuesController(
    app.datasource.models.Queues,
    app.datasource.models.Peers,
    app.datasource.models.Users,
    app.datasource.models.Ivrs,
  );
  app.route('/queues')
    .all(app.auth.authenticate())
    .get((req, res) => {
      queuesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      queuesController.create(req.body, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/queues/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      queuesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      queuesController.update(req.body, req.params, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      queuesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
