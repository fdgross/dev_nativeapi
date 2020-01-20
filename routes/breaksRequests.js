import BreaksRequestsController from "../controllers/breaksRequests";

export default app => {
  const breaksRequests = new BreaksRequestsController(
    app.datasource.models.BreaksRequests,
    app.datasource.models.Breaks,
    app.datasource.models.Users,
  );
  app
    .route("/breaksRequests")
    .all(app.auth.authenticate())
    .get((req, res) => {
      breaksRequests.getAll().then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .post((req, res) => {
      breaksRequests.create(req.body, req.user).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    });

  app
    .route("/breaksRequests/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      breaksRequests.getById(req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .put((req, res) => {
      breaksRequests.update(req.body, req.params, req.user).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .delete((req, res) => {
      breaksRequests.delete(req.params).then(response => {
        res.sendStatus(response.statusCode);
      });
    });
};
