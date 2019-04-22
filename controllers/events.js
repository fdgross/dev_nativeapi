import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class EventsController {
  constructor(Events, Queues, Ivrs) {
    this.Events = Events;
    this.Queues = Queues;
    this.Ivrs = Ivrs;
  }

  getAll() {
    return this.Events.findAll({
      include: [
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
    return this.Events.findOne({
      include: [
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

  create(data, createdBy) {
    data.createdBy = createdBy.username;
    const queues = data.queues;
    delete data.queues;
    const ivrs = data.ivrs;
    delete data.ivrs;
    return this.Events.create(data)
      .then((newEvent) => {
        newEvent.setQueues(queues);
        newEvent.setIvrs(ivrs);
        return newEvent;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params, updatedBy) {
    data.updatedBy = updatedBy.username;
    const queues = data.queues;
    delete data.queues;
    const ivrs = data.ivrs;
    delete data.ivrs;
    return this.Events.update(data, {
      where: params,
    })
      .then((result) => {
        if (result[0] === 0) {
          return errorResponse(`Event id ${params.id} not found`, HttpStatus.NOT_FOUND);
        }
        this.Events.findOne({
          where: params,
        })
          .then((updatedEvent) => {
            updatedEvent.setQueues(queues);
            updatedEvent.setIvrs(ivrs);
          });
        return defaultResponse(result);
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Events.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default EventsController;
