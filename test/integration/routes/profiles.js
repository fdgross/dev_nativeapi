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
      request
        .get('/profiles')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultProfile.id);
          expect(res.body[0].name).to.be.eql(defaultProfile.name);
          expect(res.body[0].description).to.be.eql(defaultProfile.description);
          done(err);
        });
    });
  });

  describe('Route GET /profiles/{id}', () => {
    it('should return a profile', (done) => {
      request
        .get('/profiles/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultProfile.id);
          expect(res.body.name).to.be.eql(defaultProfile.name);
          expect(res.body.description).to.be.eql(defaultProfile.description);
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
      request
        .post('/profiles')
        .set('Authorization', `bearer ${token}`)
        .send(newProfile)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newProfile.id);
          expect(res.body.name).to.be.eql(newProfile.name);
          expect(res.body.description).to.be.eql(newProfile.description);
          done(err);
        });
    });
  });

  describe('Route PUT /profiles/{id}', () => {
    it('should update a profile', (done) => {
      const updatedProfile = {
        id: 1,
        name: 'Updated Profile',
      };
      request
        .put('/profiles/1')
        .set('Authorization', `bearer ${token}`)
        .send(updatedProfile)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
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
