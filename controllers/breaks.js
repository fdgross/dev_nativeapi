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

class BreaksController {
  constructor(Breaks) {
    this.Breaks = Breaks;
  }

  getAll() {
    return this.Breaks.findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Breaks.findOne({
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data, createdBy) {
    data.createdBy = createdBy.username;
    return this.Breaks.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY),
      );
  }

  update(data, params, updatedBy) {
    data.updatedBy = updatedBy.username;
    return this.Breaks.update(data, {
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY),
      );
  }

  delete(params) {
    return this.Breaks.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY),
      );
  }
}

export default BreaksController;
