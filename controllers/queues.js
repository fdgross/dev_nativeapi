import HttpStatus from 'http-status';
// import { writePeersToFile } from './filePersist';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class QueuesController {
  constructor(Queues, Peers, Users, Ivrs) {
    this.Queues = Queues;
    this.Peers = Peers;
    this.Users = Users;
    this.Ivrs = Ivrs;
  }

  getAll() {
    return this.Queues.findAll({
      include: [
        {
          model: this.Peers,
          as: 'Peers',
          through: { attributes: [] }, // HIDE PEERSQUEUES ASSOCIATION
          attributes: ['id', 'username', 'name'],
        },
        {
          model: this.Users,
          as: 'Users',
          through: { attributes: [] }, // HIDE USERSQUEUES ASSOCIATION
          attributes: ['id', 'username', 'name'],
        },
        {
          model: this.Ivrs,
          as: 'CustomRulesBefore',
          through: { attributes: [] }, // HIDE ASSOCIATION
        },
        {
          model: this.Ivrs,
          as: 'CustomRulesAfter',
          through: { attributes: [] }, // HIDE ASSOCIATION
        },
      ],
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Queues.findOne({
      include: [
        {
          model: this.Peers,
          as: 'Peers',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: ['id', 'username', 'name'],
        },
        {
          model: this.Users,
          as: 'Users',
          through: { attributes: [] }, // HIDE ASSOCIATION
          attributes: ['id', 'username', 'name'],
        },
        {
          model: this.Ivrs,
          as: 'CustomRulesBefore',
          through: { attributes: [] }, // HIDE ASSOCIATION
        },
        {
          model: this.Ivrs,
          as: 'CustomRulesAfter',
          through: { attributes: [] }, // HIDE ASSOCIATION
        },
      ],
      where: params,
    })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    const peers = data.peers;
    delete data.peers;
    const users = data.users;
    delete data.users;
    const customRulesBefore = data.customRulesBefore;
    delete data.customRulesBefore;
    const customRulesAfter = data.customRulesAfter;
    delete data.customRulesAfter;
    return this.Queues.create(data)
      .then((newQueue) => {
        newQueue.setPeers(peers);
        newQueue.setUsers(users);
        newQueue.setCustomRulesBefore(customRulesBefore);
        newQueue.setCustomRulesAfter(customRulesAfter);
        return newQueue;
      })
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    const peers = data.peers;
    delete data.peers;
    const users = data.users;
    delete data.users;
    const customRulesBefore = data.customRulesBefore;
    delete data.customRulesBefore;
    const customRulesAfter = data.customRulesAfter;
    delete data.customRulesAfter;
    return this.Queues.update(data, {
      where: params,
    })
      .then((result) => {
        if (result[0] === 0) {
          return errorResponse(`Queue id ${params.id} not found`, HttpStatus.NOT_FOUND);
        }
        this.Queues.findOne({
          where: params,
        })
          .then((updatedQueue) => {
            updatedQueue.setPeers(peers);
            updatedQueue.setUsers(users);
            updatedQueue.setCustomRulesBefore(customRulesBefore);
            updatedQueue.setCustomRulesAfter(customRulesAfter);
          });
        return defaultResponse(result);
      })
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Queues.destroy({
      where: params,
    })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default QueuesController;
