import FeaturesController from '../controllers/meetmes';

export default(app) => {
  const meetmesController = new FeaturesController(app.datasource.models.Meetmes);
  app.route('/meetmes')
    .all(app.auth.authenticate())
    .get((req, res) => {
      meetmesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      meetmesController.create(req.body, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/meetmes/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      meetmesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      meetmesController.update(req.body, req.params, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      meetmesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
