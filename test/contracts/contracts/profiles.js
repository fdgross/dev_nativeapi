import jwt from 'jwt-simple';

describe('Routes Profiles', () => {
  const Profiles = app.datasource.models.Profiles;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultProfile = {
    id: 1,
    name: 'Default Profile',
    description: 'Default description',
  };

  let token;

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'John doe',
        email: 'john@mail.com',
        password: '12345',
      }))
      .then((user) => {
        Profiles.destroy({ where: {} })
          .then(() => Profiles.create(defaultProfile))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /profiles', () => {
    it('should return a list of profiles', (done) => {
      const profilesList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      }));
      request
        .get('/profiles')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, profilesList);
          done(err);
        });
    });
  });

  describe('Route GET /profiles/{id}', () => {
    it('should return a profile', (done) => {
      const profile = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });
      request
        .get('/profiles/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, profile);
          done(err);
        });
    });
  });

  describe('Route POST /profiles', () => {
    it('should create a profile', (done) => {
      const newProfile = {
        id: 2,
        name: 'New Profile',
        description: 'new description',
      };

      const profile = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
        .post('/profiles')
        .set('Authorization', `bearer ${token}`)
        .send(newProfile)
        .end((err, res) => {
          joiAssert(res.body, profile);
          done(err);
        });
    });
  });

  describe('Route PUT /profiles/{id}', () => {
    it('should update a profile', (done) => {
      const updatedProfile = {
        id: 1,
        name: 'Updated Profile',
        description: 'Updated Description',
      };
      const updatedCount = Joi.array().items(1);
      request
        .put('/profiles/1')
        .set('Authorization', `bearer ${token}`)
        .send(updatedProfile)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /profiles/{id}', () => {
    it('should delete a profile', (done) => {
      request
        .delete('/profiles/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});

