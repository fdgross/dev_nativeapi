import ApisController from "../controllers/apis";

export default app => {
  const apisController = new ApisController(app.datasource.models.Apis);

  app
    .route("/apis")
    .all(app.auth.authenticate())
    .get((req, res) => {
      apisController.getAll().then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .post((req, res) => {
      apisController.create(req.body, req.user).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    });

  app
    .route("/apis/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      apisController.getById(req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .put((req, res) => {
      apisController.update(req.body, req.params, req.user).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .delete((req, res) => {
      apisController.delete(req.params).then(response => {
        res.sendStatus(response.statusCode);
      });
    });
};
