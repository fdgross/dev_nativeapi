import CategoriesController from '../controllers/categories';

export default(app) => {
  const categoriesController = new CategoriesController(app.datasource.models.Categories);
  app.route('/categories')
    .all(app.auth.authenticate())
    .get((req, res) => {
      categoriesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      categoriesController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/categories/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      categoriesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      categoriesController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      categoriesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
