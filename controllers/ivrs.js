import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class IvrsController {
  constructor(Ivrs, IvrsDetails) {
    this.Ivrs = Ivrs;
    this.IvrsDetails = IvrsDetails;
  }

  getAll() {
    return this.Ivrs.findAll({
      include: [
        {
          model: this.IvrsDetails,
          as: 'IvrDetails',
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
    return this.Ivrs.findOne({
      where: params,
      include: [
        {
          model: this.IvrsDetails,
          as: 'IvrDetails',
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
    const ivrDetails = data.ivrDetails;
    delete data.ivrDetails;

    return this.Ivrs.create(data)
      .then((newIvr) => {
        ivrDetails.forEach((detail) => {
          this.IvrsDetails.create(detail)
            .then(newDetail => newIvr.addIvrDetails(newDetail.id));
        });
        return newIvr;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    const ivrDetails = data.ivrDetails;
    delete data.ivrDetails;
    this.IvrsDetails.destroy({
      where: { ivrId: params.id },
    });
    return this.Ivrs.update(data, {
      where: params,
    })
      .then((updatedIvrCount) => {
        this.Ivrs.findOne({
          where: params,
        })
          .then((updatedIvr) => {
            ivrDetails.forEach((detail) => {
              this.IvrsDetails.create(detail)
                .then(newDetail => updatedIvr.addIvrDetails(newDetail.id));
            });
          });
        return updatedIvrCount;
      })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Ivrs.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default IvrsController;
