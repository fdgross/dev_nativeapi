import PeersController from '../../../controllers/peers';
import Profiles from '../../../models/Profiles';
import Categories from '../../../models/Categories';
import Groups from '../../../models/Groups';

describe('Controllers: Peers', () => {
  describe('Get all peers: getAll()', () => {
    it('should return a list of peers', () => {
      const Peers = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        username: 1000,
        secret: 'voip1000',
        name: 'Peer 1000',
        email: '1000@mail.com',
        callCenter: false,
        hideOnAgenda: false,
        cc: 'Cost Center',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
        profileId: 2,
        categoryId: 3,
        Profile: {
          id: 2,
          name: 'Test Profile',
          description: 'Description Profile',
        },
        Category: {
          id: 3,
          name: 'Test Category',
          description: 'Description Category',
        },
        Groups: [
          {
            id: 1,
            name: 'Group1',
            description: 'Description Group1',
          },
          {
            id: 2,
            name: 'Group2',
            description: 'Description Group2',
          },
        ],
      }];

      td.when(Peers.findAll({
        include: [
          {
            model: Categories,
            as: 'Category',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: Profiles,
            as: 'Profile',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: Groups,
            as: 'Groups',
            through: { attributes: [] }, // HIDE GROUPSPPERS ASSOCIATION
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
      })).thenResolve(expectedResponse);

      const peersController = new PeersController(Peers, Profiles, Categories, Groups);
      return peersController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get one peer: getById()', () => {
    it('should return a peer', () => {
      const Peers = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        username: 1000,
        secret: 'voip1000',
        name: 'Peer 1000',
        email: '1000@mail.com',
        callCenter: false,
        hideOnAgenda: false,
        cc: 'Cost Center',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
        profileId: 2,
        categoryId: 3,
        Profile: {
          id: 2,
          name: 'Test Profile',
          description: 'Description Profile',
        },
        Category: {
          id: 3,
          name: 'Test Category',
          description: 'Description Category',
        },
        Groups: [
          {
            id: 1,
            name: 'Group1',
            description: 'Description Group1',
          },
          {
            id: 2,
            name: 'Group2',
            description: 'Description Group2',
          },
        ],
      }];

      td.when(Peers.findOne({
        include: [
          {
            model: Categories,
            as: 'Category',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: Profiles,
            as: 'Profile',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
          {
            model: Groups,
            as: 'Groups',
            through: { attributes: [] }, // HIDE GROUPSPPERS ASSOCIATION
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
        where: {
          id: { id: 1 },
        },
      })).thenResolve(expectedResponse);

      const peersController = new PeersController(Peers, Profiles, Categories, Groups);
      return peersController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a peer: create()', () => {
    it('should create a peer', () => {
      const Peers = {
        create: td.function(),
      };

      const requestBody = {
        username: 1000,
        secret: 'voip1000',
        name: 'Peer 1000',
        email: '1000@mail.com',
        callCenter: false,
        hideOnAgenda: false,
        cc: 'Cost Center',
        profileId: 2,
        categoryId: 3,
        groups: [1, 2],
      };

      const expectedResponse = [{
        id: 1,
        username: 1000,
        secret: 'voip1000',
        name: 'Peer 1000',
        email: '1000@mail.com',
        callCenter: false,
        hideOnAgenda: false,
        cc: 'Cost Center',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
        profileId: 2,
        categoryId: 3,
      }];

      td.when(Peers.create(requestBody)).thenResolve(expectedResponse);

      const peersController = new PeersController(Peers, Profiles, Categories, Groups);
      return peersController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a peer: update()', () => {
    it('should update an existing peer', () => {
      const Peers = {
        update: td.function(),
      };

      const requestBody = {
        username: 1001,
        secert: 'voip1001',
        name: 'Peer 1001',
        email: '1001@mail.com',
        callCenter: true,
        hideOnAgenda: true,
        cc: 'Cost Center1',
        profileId: 2,
        categoryId: 3,
        groups: [1, 2],
      };

      const expectedResponse = [{
        id: 1,
        username: 1001,
        secert: 'voip1001',
        name: 'Peer 1001',
        email: '1001@mail.com',
        callCenter: true,
        hideOnAgenda: true,
        cc: 'Cost Center1',
        created_at: '2016-08-06T23:55:36.692Z',
        updated_at: '2016-08-10T23:55:36.692Z',
        profileId: 2,
        categoryId: 3,
      }];

      td.when(Peers.update(requestBody, {
        where: { id: 1 },
      })).thenResolve(expectedResponse);

      const peersController = new PeersController(Peers, Profiles, Categories, Groups);
      return peersController.update(requestBody, { id: 1 })
        .then((response) => {
          const msg = JSON.stringify(response.data);
          console.log(`RESPONSE: ${msg}`);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Delete a peer: delete()', () => {
    it('should delete an existing peer', () => {
      const Peers = {
        destroy: td.function(),
      };

      td.when(Peers.destroy({ where: { id: 1 } })).thenResolve({});

      const peersController = new PeersController(Peers, Profiles, Categories, Groups);
      return peersController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
