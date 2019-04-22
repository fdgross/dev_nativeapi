import CostCentersController from '../controllers/costCenters';

export default(app) => {
  const costCentersController = new CostCentersController(app.datasource.models.CostCenters);
  app.route('/costCenters')
    .all(app.auth.authenticate())
    .get((req, res) => {
      costCentersController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      costCentersController.create(req.body, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/costCenters/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      costCentersController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      costCentersController.update(req.body, req.params, req.user)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      costCentersController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
