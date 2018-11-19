import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

const filePersist = require('./filePersist');

class PeersController {
  constructor(Peers, Profiles, Categories, Groups) {
    this.Peers = Peers;
    this.Profiles = Profiles;
    this.Categories = Categories;
    this.Groups = Groups;
  }

  getAll() {
    return this.Peers.findAll({
      include: [
        {
          model: this.Categories,
          as: 'Category',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: this.Profiles,
          as: 'Profile',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: this.Groups,
          as: 'Groups',
          through: { attributes: [] }, // HIDE ASSOCIATION
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
    return this.Peers.findOne({
      include: [
        {
          model: this.Categories,
          as: 'Category',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: this.Profiles,
          as: 'Profile',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: this.Groups,
          as: 'Groups',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      where: {
        id: params,
      },
    })
      .then((result) => {
        if (!result) {
          return errorResponse(`Peer id ${params} not found`, HttpStatus.NOT_FOUND);
        }
        return defaultResponse(result);
      })
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    const groups = data.groups;
    delete data.groups;
    return this.Peers.create(data)
      .then((newPeer) => {
        newPeer.setGroups(groups).then(() => filePersist.writePeersToFile());
        return newPeer;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    const groups = data.groups;
    delete data.groups;
    return this.Peers.update(data, {
      where: params,
    })
      .then((result) => {
        if (result[0] === 0) {
          return errorResponse(`Peer id ${params.id} not found`, HttpStatus.NOT_FOUND);
        }
        this.Peers.findOne({
          where: params,
        })
          .then((updatedPeer) => {
            updatedPeer.setGroups(groups).then(() => filePersist.writePeersToFile());
          });
        return defaultResponse(result);
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Peers.destroy({
      where: params,
    })
      .then((result) => {
        filePersist.writePeersToFile();
        return result;
      })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default PeersController;
