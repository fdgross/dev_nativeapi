import ApisCallsController from "../controllers/apisCalls";

export default app => {
  const apisCallsController = new ApisCallsController(
    app.datasource.models.ApisCalls,
  );

  app
    .route("/apisCalls")
    .all(app.auth.authenticate())
    .get((req, res) => {
      apisCallsController.getAll().then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .post((req, res) => {
      apisCallsController.create(req.body, req.user).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    });

  app
    .route("/apisCalls/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      apisCallsController.getById(req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .put((req, res) => {
      apisCallsController
        .update(req.body, req.params, req.user)
        .then(response => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      apisCallsController.delete(req.params).then(response => {
        res.sendStatus(response.statusCode);
      });
    });
};
