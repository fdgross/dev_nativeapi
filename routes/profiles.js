import ProfilesController from '../controllers/profiles';

export default(app) => {
  const profilesController = new ProfilesController(
    app.datasource.models.Profiles,
    app.datasource.models.OutRoutes,
  );
  app.route('/profiles')
    .all(app.auth.authenticate())
    .get((req, res) => {
      profilesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      profilesController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/profiles/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      profilesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      profilesController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      profilesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
