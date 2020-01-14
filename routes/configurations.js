import Configurations from "../controllers/configurations";

export default app => {
  const configurations = new Configurations(
    app.datasource.models.Configurations,
  );

  app
    .route("/configurations")
    .all(app.auth.authenticate())
    .get((req, res) => {
      configurations.getLast().then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .post((req, res) => {
      configurations.create(req.body).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    });

  app
    .route("/configurations/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      configurations.getById(req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .put((req, res) => {
      configurations.update(req.body, req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .delete((req, res) => {
      configurations.delete(req.params).then(response => {
        res.sendStatus(response.statusCode);
      });
    });
};
