/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

const filePersist = require('./filePersist');

const defaultExclude = ['createdAt', 'updatedAt'];

class PeersController {
  constructor(Peers, Profiles, Categories, Groups) {
    this.Peers = Peers;
    this.Profiles = Profiles;
    this.Categories = Categories;
    this.Groups = Groups;

    this.includeCategory = {
      model: this.Categories,
      as: 'Category',
      attributes: {
        exclude: defaultExclude,
      },
    };

    this.includeProfile = {
      model: this.Profiles,
      as: 'Profile',
      attributes: {
        exclude: defaultExclude,
      },
    };

    this.includeGroups = {
      model: this.Groups,
      as: 'Groups',
      through: { attributes: [] }, // HIDE ASSOCIATION
      attributes: {
        exclude: defaultExclude,
      },
    };

    this.setDefaultQuery();
  }

  setDefaultQuery() {
    this.attributes = { exclude: [] };
    this.include = [this.includeCategory, this.includeProfile, this.includeGroups];
    this.limit = 50;
    this.offset = 0;
    this.sort = [];
    this.where = { };
  }

  setFields(fields) {
    this.attributes = fields.split(',');
    this.include = [];
    if (this.attributes.indexOf('Category') >= 0) {
      this.attributes.pop(this.attributes.indexOf('Category'));
      this.include.push(this.includeCategory);
    }
    if (this.attributes.indexOf('Profile') >= 0) {
      this.attributes.pop(this.attributes.indexOf('Profile'));
      this.include.push(this.includeProfile);
    }
    if (this.attributes.indexOf('Groups') >= 0) {
      this.attributes.pop(this.attributes.indexOf('Groups'));
      this.include.push(this.includeGroups);
    }
  }

  setPagination(page, perPage) {
    if (typeof perPage === 'undefined') {
      this.limit = 50;
      perPage = this.limit;
    }
    if (typeof page === 'undefined') {
      page = 0;
    }
    this.offset = parseInt(page) * parseInt(perPage);
    this.limit = parseInt(perPage);
  }

  setSort(sort) {
    const arraySort = sort.split(',');
    arraySort.forEach((column) => {
      this.sort.push([column, 'ASC']);
    });
  }

  setDesc(desc) {
    const arrayDesc = desc.split(',');
    arrayDesc.forEach((column) => {
      this.sort.push([column, 'DESC']);
    });
  }

  setWhereUsername(usernames) {
    this.where = { username: usernames.split(',') };
  }

  getAll(query) {
    this.setDefaultQuery();

    if (typeof query.fields !== 'undefined') {
      this.setFields(query.fields);
    }

    if ((typeof query.page !== 'undefined') || (typeof query.perPage !== 'undefined')) {
      this.setPagination(query.page, query.perPage);
    }

    if (typeof query.sort !== 'undefined') {
      this.setSort(query.sort);
    }

    if (typeof query.desc !== 'undefined') {
      this.setDesc(query.desc);
    }

    if (typeof query.username !== 'undefined') {
      this.setWhereUsername(query.username);
    }

    return this.Peers.findAll({
      attributes: this.attributes,
      include: this.include,
      where: this.where,
      order: this.sort,
      limit: this.limit,
      offset: this.offset,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params, query) {
    this.setDefaultQuery();

    if (typeof query.fields !== 'undefined') {
      this.setFields(query.fields);
    }

    return this.Peers.findOne({
      attributes: this.attributes,
      include: this.include,
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
