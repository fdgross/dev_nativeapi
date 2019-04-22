import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

const filePersist = require('./filePersist');

class ProfilesController {
  constructor(Profiles, OutRoutes) {
    this.Profiles = Profiles;
    this.OutRoutes = OutRoutes;
  }

  getAll() {
    return this.Profiles.findAll({
      include: [
        {
          model: this.OutRoutes,
          as: 'OutRoutes',
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
    return this.Profiles.findOne({
      include: [
        {
          model: this.OutRoutes,
          as: 'OutRoutes',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data, createdBy) {
    data.createdBy = createdBy.username;
    const outRoutes = data.outRoutes;
    delete data.outRoutes;
    return this.Profiles.create(data)
      .then((newProfile) => {
        newProfile.setOutRoutes(outRoutes).then(() => filePersist.writeProfilesToFile());
        return newProfile;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params, updatedBy) {
    data.updatedBy = updatedBy.username;
    const outRoutes = data.outRoutes;
    delete data.outRoutes;
    return this.Profiles.update(data, {
      where: params,
    })
      .then((result) => {
        if (result[0] === 0) {
          return errorResponse(`Profile id ${params.id} not found`, HttpStatus.NOT_FOUND);
        }
        this.Profiles.findOne({
          where: params,
        })
          .then((updatedProfile) => {
            updatedProfile.setOutRoutes(outRoutes).then(() => filePersist.writeProfilesToFile());
          });
        return defaultResponse(result);
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Profiles.destroy({
      where: params,
    })
      .then((result) => {
        filePersist.writeProfilesToFile();
        return result;
      })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default ProfilesController;
