import MohsController from '../controllers/mohs';

export default(app) => {
  const mohsController = new MohsController(app.datasource.models.Mohs);
  app.route('/mohs')
    .all(app.auth.authenticate())
    .get((req, res) => {
      mohsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      mohsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/mohs/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      mohsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      mohsController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      mohsController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
