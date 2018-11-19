import TrunksController from '../controllers/trunks';

export default(app) => {
  const trunksController = new TrunksController(app.datasource.models.Trunks);
  app.route('/trunks')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      trunksController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      trunksController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/trunks/:id')
    // .all(app.auth.authenticate())
    .get((req, res) => {
      trunksController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      trunksController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      trunksController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
