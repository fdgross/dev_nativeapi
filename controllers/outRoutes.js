import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

const filePersist = require('./filePersist');

class OutRoutesController {
  constructor(OutRoutes, OutRoutesDetails, OutRoutesOverflows) {
    this.OutRoutes = OutRoutes;
    this.OutRoutesDetails = OutRoutesDetails;
    this.OutRoutesOverflows = OutRoutesOverflows;
  }

  getAll() {
    return this.OutRoutes.findAll({
      include: [
        {
          model: this.OutRoutesDetails,
          as: 'OutRouteDetails',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: this.OutRoutesOverflows,
              as: 'OutRouteOverflows',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.OutRoutes.findOne({
      where: params,
      include: [
        {
          model: this.OutRoutesDetails,
          as: 'OutRouteDetails',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
          include: [
            {
              model: this.OutRoutesOverflows,
              as: 'OutRouteOverflows',
              attributes: {
                exclude: ['createdAt', 'updatedAt'],
              },
            },
          ],
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    const outRoutesDetails = data.outRoutesDetails;
    delete data.outRoutesDetails;

    return this.OutRoutes.create(data)
      .then((newOutRoute) => {
        let c = 0;
        outRoutesDetails.forEach((detail) => {
          c += 1;
          this.OutRoutesDetails.create(detail)
            .then((newDetail) => {
              const outRouteOverflows = detail.overflows;
              delete detail.overflows;
              outRouteOverflows.forEach((overflow) => {
                this.OutRoutesOverflows.create(overflow)
                  .then((newOverflow) => {
                    newDetail.addOutRouteOverflows(newOverflow.id);
                  });
              });
              newOutRoute.addOutRouteDetails(newDetail.id);
            })
            .then(() => {
              if (c === outRoutesDetails.length) {
                filePersist.writeOutRoutesToFile();
                c = 0;
              }
            });
        });
        return newOutRoute;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    const outRoutesDetails = data.outRoutesDetails;
    delete data.outRoutesDetails;
    this.OutRoutesDetails.destroy({
      where: { OutRouteId: params.id },
    });
    return this.OutRoutes.update(data, {
      where: params,
    })
      .then((updatedOutRouteCount) => {
        this.OutRoutes.findOne({
          where: params,
        })
          .then((updatedOutRoute) => {
            outRoutesDetails.forEach((detail) => {
              this.OutRoutesDetails.create(detail)
                .then((newDetail) => {
                  console.log(detail);
                  const outRouteOverflows = detail.overflows;
                  console.log(outRouteOverflows);
                  delete detail.overflows;
                  outRouteOverflows.forEach((overflow) => {
                    this.OutRoutesOverflows.create(overflow)
                      .then((newOverflow) => {
                        newDetail.addOutRouteOverflows(newOverflow.id);
                      });
                  });
                  updatedOutRoute.addOutRouteDetails(newDetail.id);
                });
              // .then(() => filePersist.writeOutRoutesToFile());
            });
          });
        return updatedOutRouteCount;
      })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.OutRoutes.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default OutRoutesController;
