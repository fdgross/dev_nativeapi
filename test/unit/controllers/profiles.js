import ProfilesController from '../../../controllers/profiles';

describe('Controllers: Profiles', () => {
  describe('Get all profiles: getAll()', () => {
    it('should return a list of profiles', () => {
      const Profiles = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Profile',
        description: 'Description Profile',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      }];

      td.when(Profiles.findAll({})).thenResolve(expectedResponse);

      const profilesController = new ProfilesController(Profiles);
      return profilesController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get one profile: getById()', () => {
    it('should return a profile', () => {
      const Profiles = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Profile',
        description: 'Description Profile',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      };

      td.when(Profiles.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const profilesController = new ProfilesController(Profiles);
      return profilesController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a profile: create()', () => {
    it('should create a profile', () => {
      const Profiles = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Test Profile',
        description: 'Description Profile',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Profile',
        description: 'Description Profile',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      };

      td.when(Profiles.create(requestBody)).thenResolve(expectedResponse);

      const profilesController = new ProfilesController(Profiles);
      return profilesController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a profile: update()', () => {
    it('should update an existing profile', () => {
      const Profiles = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Test Profile Updated',
        description: 'Description Profile Updated',
      };

      const expectedResponse = {
        id: 1,
        name: 'Test Profile Updated',
        description: 'Description Profile Updated',
        created_at: '2018-03-26T10:07:55.692Z',
        updated_at: '2018-03-26T10:07:55.692Z',
      };

      td.when(Profiles.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const profilesController = new ProfilesController(Profiles);
      return profilesController.update(requestBody, { id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Delete a profile: delete()', () => {
    it('should delete an existing profile', () => {
      const Profiles = {
        destroy: td.function(),
      };

      td.when(Profiles.destroy({ where: { id: 1 } })).thenResolve({});

      const profilesController = new ProfilesController(Profiles);
      return profilesController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
