import HttpStatus from "http-status";

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) =>
  defaultResponse(
    {
      error: message,
    },
    statusCode,
  );

class UsersBreaksRequestsController {
  constructor(UsersBreaksRequests, Breaks, Users) {
    this.UsersBreaksRequests = UsersBreaksRequests;
    this.Breaks = Breaks;
    this.Users = Users;
  }

  getAll(params) {
    return this.UsersBreaksRequests.findAll({
      where: {
        userId: params.userId,
        $or: [{ active: true }, { awaitingApproval: true }],
      },
      include: [
        {
          model: this.Breaks,
          as: "Break",
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "description",
              "createdBy",
              "updatedBy",
            ],
          },
        },
        {
          model: this.Users,
          as: "User",
          attributes: {
            exclude: [
              "email",
              "password",
              "administrator",
              "superAdministrator",
              "deletedAt",
              "createdBy",
              "updatedBy",
              "createdAt",
              "updatedAt",
              "peerId",
            ],
          },
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }
}

export default UsersBreaksRequestsController;
