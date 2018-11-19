import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

// const filePersist = require('./filePersist');

class TrunksController {
  constructor(Trunks) {
    this.Trunks = Trunks;
  }

  getAll() {
    let trunksSip = this.Trunks.scope('defaultTrunk', 'trunkSipIax').findAll({});
    const trunksKhomp = this.Trunks.scope('defaultTrunk', 'trunkKhomp').findAll({});

    // CONCAT BOTH ARRAYS INTO ONE
    trunksSip = trunksKhomp.reduce((coll, item) => {
      coll.push(item);
      return coll;
    }, trunksSip);

    return trunksSip
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Trunks.scope('defaultTrunk', 'trunkSipIax').findOne({
      where: params,
    })
      .then((trunk) => {
        if (trunk == null) {
          return this.Trunks.scope('defaultTrunk', 'trunkKhomp').findOne({
            where: params,
          });
        }
        return trunk;
      })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Trunks.create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Trunks.update(data, {
      where: params,
    })
      .then((updatedTrunk) => {
        // filePersist.writePeersToFile();
        return updatedTrunk;
      })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Trunks.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default TrunksController;
