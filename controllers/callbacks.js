import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

const filePersist = require('./filePersist');

class CallbacksController {
  constructor(Callbacks, Profiles) {
    this.Callbacks = Callbacks;
    this.Profiles = Profiles;
  }

  getAll() {
    return this.Callbacks.findAll({
      include: [
        {
          model: this.Profiles,
          as: 'Profile',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Callbacks.findOne({
      include: [
        {
          model: this.Profiles,
          as: 'Profile',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data, createdBy) {
    data.createdBy = createdBy.username;
    return this.Callbacks.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params, updatedBy) {
    data.updatedBy = updatedBy.username;
    return this.Callbacks.update(data, {
      where: params,
    })
      .then((updatedCallback) => {
        filePersist.writePeersToFile();
        return updatedCallback;
      })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Callbacks.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default CallbacksController;
