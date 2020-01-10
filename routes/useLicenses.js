import UseLicensesController from "../controllers/useLicenses";

export default app => {
  const useLicensesController = new UseLicensesController(
    app.datasource.models.UseLicenses,
  );

  app
    .route("/useLicenses")
    .all(app.auth.authenticate())
    .get((req, res) => {
      useLicensesController.getLast().then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .post((req, res) => {
      useLicensesController.create(req.body).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    });

  app
    .route("/useLicenses/:id")
    .all(app.auth.authenticate())
    .get((req, res) => {
      useLicensesController.getById(req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .put((req, res) => {
      useLicensesController.update(req.body, req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    })
    .delete((req, res) => {
      useLicensesController.delete(req.params).then(response => {
        res.sendStatus(response.statusCode);
      });
    });
};
