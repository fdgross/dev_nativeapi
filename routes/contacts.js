import ContactsController from '../controllers/contacts';

export default(app) => {
  const contactsController = new ContactsController(app.datasource.models.Contacts);
  app.route('/contacts')
    .all(app.auth.authenticate())
    .get((req, res) => {
      contactsController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      contactsController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/contacts/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      contactsController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      contactsController.update(req.body, req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      contactsController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
