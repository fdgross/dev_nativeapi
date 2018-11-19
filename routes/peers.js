import PeersController from '../controllers/peers';

export default(app) => {
  const peersController = new PeersController(
    app.datasource.models.Peers,
    app.datasource.models.Profiles,
    app.datasource.models.Categories,
    app.datasource.models.Groups,
  );
  app.route('/peers')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      peersController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      peersController.create(req.body)
        .then((response) => {
          res.setHeader('Location', `http://localhost:7000/peers/${response.data.id}`);
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/peers/:id')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      peersController.getById(req.params.id)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      peersController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      peersController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
