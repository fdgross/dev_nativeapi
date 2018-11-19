import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class ServiceHoursController {
  constructor(ServiceHours, ServiceHoursDetails, Queues, Ivrs) {
    this.ServiceHours = ServiceHours;
    this.ServiceHoursDetails = ServiceHoursDetails;
    this.Queues = Queues;
    this.Ivrs = Ivrs;
  }

  getAll() {
    return this.ServiceHours.findAll({
      include: [
        {
          model: this.ServiceHoursDetails,
          as: 'ServiceHoursDetails',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: this.Queues,
          as: 'Queues',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: ['id', 'name'],
        },
        {
          model: this.Ivrs,
          as: 'Ivrs',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: ['id', 'name'],
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.ServiceHours.findOne({
      include: [
        {
          model: this.ServiceHoursDetails,
          as: 'ServiceHoursDetails',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: this.Queues,
          as: 'Queues',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: ['id', 'name'],
        },
        {
          model: this.Ivrs,
          as: 'Ivrs',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: ['id', 'name'],
        },
      ],
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    const ivrs = data.ivrs;
    delete data.ivrs;
    const queues = data.queues;
    delete data.queues;
    const serviceHoursDetails = data.serviceHoursDetails;
    delete data.serviceHoursDetails;

    const arrDetails = new Array;
    serviceHoursDetails.forEach((detail) => {
      this.ServiceHoursDetails.create(detail).then(newDetail => arrDetails.push(newDetail.id));
    });

    return this.ServiceHours.create(data)
      .then((newServiceHour) => {
        newServiceHour.setIvrs(ivrs);
        newServiceHour.setQueues(queues);
        arrDetails.forEach((detail) => {
            newServiceHour.addServiceHoursDetails(detail);
        });
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    const ivrs = data.ivrs;
    delete data.ivrs;
    const queues = data.queues;
    delete data.queues;
    const serviceHoursDetails = data.serviceHoursDetails;
    delete data.serviceHoursDetails;
    
    this.ServiceHoursDetails.destroy({
      where: { serviceHourId: params.id },
    });

    this.ServiceHours.findOne({
      where: params,
    })
      .then((updatedServiceHour) => {
        updatedServiceHour.setQueues(queues);
        updatedServiceHour.setIvrs(ivrs);
        serviceHoursDetails.forEach((detail) => {
          this.ServiceHoursDetails.create(detail)
            .then(newDetail => updatedServiceHour.addServiceHoursDetails(newDetail.id));
        });
      });

    return this.ServiceHours.update(data, {
      where: params,
    })
      .then((result) => {
        if (result[0] === 0) {
          return errorResponse(`ServiceHour id ${params.id} not found`, HttpStatus.NOT_FOUND);
        }
        return defaultResponse(result);
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.ServiceHours.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default ServiceHoursController;
