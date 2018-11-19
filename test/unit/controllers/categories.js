import ProfilesController from '../../../controllers/categories';

describe('Controllers: Categories', () => {
  describe('Get all categories: getAll()', () => {
    it('should return a list of categories', () => {
      const Categories = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Category',
        nat: false,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1001,
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      }];

      td.when(Categories.findAll({})).thenResolve(expectedResponse);

      const profilesController = new ProfilesController(Categories);
      return profilesController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get one category: getById()', () => {
    it('should return a category', () => {
      const Categories = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Category',
        nat: false,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1001,
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      };

      td.when(Categories.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const profilesController = new ProfilesController(Categories);
      return profilesController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a category: create()', () => {
    it('should create a category', () => {
      const Categories = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Test Category',
        nat: false,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1001,
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Category',
        nat: false,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1001,
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      };

      td.when(Categories.create(requestBody)).thenResolve(expectedResponse);

      const profilesController = new ProfilesController(Categories);
      return profilesController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a category: update()', () => {
    it('should update an existing category', () => {
      const Categories = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Test Category Updated',
        nat: false,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1001,
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Category Updated',
        nat: false,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1001,
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      };

      td.when(Categories.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const profilesController = new ProfilesController(Categories);
      return profilesController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a category: delete()', () => {
    it('should delete an existing category', () => {
      const Categories = {
        destroy: td.function(),
      };

      td.when(Categories.destroy({ where: { id: 1 } })).thenResolve({});

      const profilesController = new ProfilesController(Categories);
      return profilesController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
