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

class BreaksRequestsController {
  constructor(BreaksRequests, Breaks) {
    this.BreaksRequests = BreaksRequests;
    this.Breaks = Breaks;
  }

  getAll() {
    return this.BreaksRequests.findAll({
      include: [
        {
          model: this.Breaks,
          as: "Break",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "description",
              "createdBy",
              "updatedBy",
            ],
          },
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.BreaksRequests.findOne({
      where: params,
      include: [
        {
          model: this.Breaks,
          as: "Break",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "description",
              "createdBy",
              "updatedBy",
            ],
          },
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  async create(data, createdBy) {
    data.createdBy = createdBy.username;

    try {
      const response = await this.BreaksRequests.create(data);
      const breakRequest = response.dataValues;

      breakRequest.break = await response.getBreak();
      breakRequest.user = await response.getUser();
      return defaultResponse(breakRequest, HttpStatus.CREATED);
    } catch (error) {
      return errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  update(data, params, updatedBy) {
    data.updatedBy = updatedBy.username;
    return this.BreaksRequests.update(data, {
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY),
      );
  }

  delete(params) {
    return this.BreaksRequests.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error =>
        errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY),
      );
  }
}

export default BreaksRequestsController;
