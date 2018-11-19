import GroupsController from '../../../controllers/groups';

describe('Controllers: Groups', () => {
  describe('Get all groups: getAll()', () => {
    it('should return a list of groups', () => {
      const Groups = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Group',
        description: 'Description Group',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      }];

      td.when(Groups.findAll({})).thenResolve(expectedResponse);

      const groupsController = new GroupsController(Groups);
      return groupsController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get one group: getById()', () => {
    it('should return a group', () => {
      const Groups = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Group',
        description: 'Description Group',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      };

      td.when(Groups.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const groupsController = new GroupsController(Groups);
      return groupsController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a group: create()', () => {
    it('should create a group', () => {
      const Groups = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Test Group',
        description: 'Description Group',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Group',
        description: 'Description Group',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      };

      td.when(Groups.create(requestBody)).thenResolve(expectedResponse);

      const groupsController = new GroupsController(Groups);
      return groupsController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a group: update()', () => {
    it('should update an existing group', () => {
      const Groups = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Test Group Updated',
        description: 'Description Group Updated',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Group Updated',
        description: 'Description Group Updated',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      };

      td.when(Groups.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const groupsController = new GroupsController(Groups);
      return groupsController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a group: delete()', () => {
    it('should delete an existing group', () => {
      const Groups = {
        destroy: td.function(),
      };

      td.when(Groups.destroy({ where: { id: 1 } })).thenResolve({});

      const groupsController = new GroupsController(Groups);
      return groupsController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
