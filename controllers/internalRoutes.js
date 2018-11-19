import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

const filePersist = require('./filePersist');

class InternalRoutesController {
  constructor(InternalRoutes, InternalRoutesDetails) {
    this.InternalRoutes = InternalRoutes;
    this.InternalRoutesDetails = InternalRoutesDetails;
  }

  getAll() {
    return this.InternalRoutes.findAll({
      include: [
        {
          model: this.InternalRoutesDetails,
          as: 'InternalRoutesDetails',
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
    return this.InternalRoutes.findOne({
      where: params,
      include: [
        {
          model: this.InternalRoutesDetails,
          as: 'InternalRoutesDetails',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    const internalRoutesDetails = data.internalRoutesDetails;
    delete data.internalRoutesDetails;

    return this.InternalRoutes.create(data)
      .then((newInternalRoute) => {
        let c = 0;
        internalRoutesDetails.forEach((detail) => {
          c += 1;
          this.InternalRoutesDetails.create(detail)
            .then(newDetail => newInternalRoute.addInternalRoutesDetails(newDetail.id))
            .then(() => {
              if (c === internalRoutesDetails.length) {
                filePersist.writeInRoutesToFile();
                c = 0;
              }
            });
        });
        return newInternalRoute;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    const internalRoutesDetails = data.internalRoutesDetails;
    delete data.internalRoutesDetails;

    this.InternalRoutesDetails.destroy({
      where: { InternalRouteId: params.id },
    });
    return this.InternalRoutes.update(data, {
      where: params,
    })
      .then((updatedInternalRouteCount) => {
        this.InternalRoutes.findOne({
          where: params,
        })
          .then((updatedInternalRoute) => {
            internalRoutesDetails.forEach((detail) => {
              this.InternalRoutesDetails.create(detail)
                .then(newDetail => updatedInternalRoute.addInternalRoutesDetails(newDetail.id)
                  .then(() => filePersist.writeInRoutesToFile()));
            });
          });
        return updatedInternalRouteCount;
      })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.InternalRoutes.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default InternalRoutesController;
