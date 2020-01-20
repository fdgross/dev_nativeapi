import UserBreaksRequestsController from "../controllers/usersBreaksRequests";

export default app => {
  const usersBreaksRequests = new UserBreaksRequestsController(
    app.datasource.models.BreaksRequests,
    app.datasource.models.Breaks,
    app.datasource.models.Users,
  );

  app
    .route("/usersBreaksRequests/:userId")
    .all(app.auth.authenticate())
    .get((req, res) => {
      usersBreaksRequests.getAll(req.params).then(response => {
        res.status(response.statusCode);
        res.json(response.data);
      });
    });
};
