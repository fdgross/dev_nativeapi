import BreaksController from "../controllers/breaks";

export default app => {
  const breaksController = new BreaksController(app.datasource.models.Breaks);
  app
    .route("/breaks")
    .all(app.auth.authenticate())
    .get((req, res) => {
      breaksController.getAll().then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .post((req, res) => {
      breaksController.create(req.body, req.user).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    });

  app
    .route("/breaks/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      breaksController.getById(req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .put((req, res) => {
      breaksController.update(req.body, req.params, req.user).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .delete((req, res) => {
      breaksController.delete(req.params).then(response => {
        res.sendStatus(response.statusCode);
      });
    });
};
