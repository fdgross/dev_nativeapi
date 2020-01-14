import HttpStatus from "http-status";

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) =>
  defaultResponse(
    {
      error: message,
    },
    statusCode,
  );

class ConfigurationsController {
  constructor(Configurations) {
    this.Configurations = Configurations;
  }

  getLast() {
    return this.Configurations.findOne({
      limit: 1,
      order: [["createdAt", "DESC"]],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Configurations.findOne({
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Configurations.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY),
      );
  }

  update(data, params) {
    return this.Configurations.update(data, {
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY),
      );
  }

  delete(params) {
    return this.Configurations.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY),
      );
  }
}

export default ConfigurationsController;
