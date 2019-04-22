import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class UsersController {
  constructor(Users, Permissions, CostCenters) {
    this.Users = Users;
    this.Permissions = Permissions;
    this.CostCenters = CostCenters;
  }

  getAll() {
    return this.Users.findAll({
      include: [
        {
          model: this.Permissions,
          as: 'Permissions',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: this.CostCenters,
          as: 'CostCenters',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      paranoid: true,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Users.findOne({
      include: [
        {
          model: this.Permissions,
          as: 'Permissions',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: this.CostCenters,
          as: 'CostCenters',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      where: params,
      paranoid: true,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data, createdBy) {
    data.createdBy = createdBy.username;
    const permissions = data.permissions;
    delete data.permissions;
    const costCenters = data.costCenters;
    delete data.costCenters;
    return this.Users.create(data)
      .then((newUser) => {
        newUser.setPermissions(permissions);
        newUser.setCostCenters(costCenters);
        return newUser;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params, updatedBy) {
    data.updatedBy = updatedBy.username;
    const permissions = data.permissions;
    delete data.permissions;
    const costCenters = data.costCenters;
    delete data.costCenters;
    return this.Users.update(data, {
      where: params,
      individualHooks: true,
      paranoid: true,
    })
      .then((result) => {
        if (result[0] === 0) {
          return errorResponse(`User id ${params.id} not found`, HttpStatus.NOT_FOUND);
        }
        this.Users.findOne({
          where: params,
        })
          .then((updatedUser) => {
            updatedUser.setPermissions(permissions);
            updatedUser.setCostCenters(costCenters);
          });
        return defaultResponse(result);
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Users.destroy({
      where: params,
      paranoid: true,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default UsersController;
