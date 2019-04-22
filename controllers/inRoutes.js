import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

// const filePersist = require('./filePersist');

class InRoutesController {
  constructor(InRoutes, InRoutesDetails, Trunks) {
    this.InRoutes = InRoutes;
    this.InRoutesDetails = InRoutesDetails;
    this.Trunks = Trunks;
  }

  getAll() {
    return this.InRoutes.findAll({
      include: [
        {
          model: this.InRoutesDetails,
          as: 'InRouteDetails',
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
    return this.InRoutes.findOne({
      where: params,
      include: [
        {
          model: this.InRoutesDetails,
          as: 'InRouteDetails',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data, createdBy) {
    data.createdBy = createdBy.username;
    const inRoutesDetails = data.inRoutesDetails;
    delete data.inRoutesDetails;

    return this.InRoutes.create(data)
      .then((newInRoute) => {
        let c = 0;
        inRoutesDetails.forEach((detail) => {
          c += 1;
          this.InRoutesDetails.create(detail)
            .then(newDetail => newInRoute.addInRouteDetails(newDetail.id))
            .then(() => {
              if (c === inRoutesDetails.length) {
                // filePersist.writeInRoutesToFile();
                c = 0;
              }
            });
        });
        return newInRoute;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params, updatedBy) {
    data.updatedBy = updatedBy.username;
    const inRoutesDetails = data.inRoutesDetails;
    delete data.inRoutesDetails;
    this.InRoutesDetails.destroy({
      where: { InRouteId: params.id },
    });
    return this.InRoutes.update(data, {
      where: params,
    })
      .then((updatedInRouteCount) => {
        this.InRoutes.findOne({
          where: params,
        })
          .then((updatedInRoute) => {
            inRoutesDetails.forEach((detail) => {
              this.InRoutesDetails.create(detail)
                .then(newDetail => updatedInRoute.addInRouteDetails(newDetail.id));
              // .then(() => filePersist.writeInRoutesToFile()));
            });
          });
        return updatedInRouteCount;
      })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.InRoutes.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default InRoutesController;
