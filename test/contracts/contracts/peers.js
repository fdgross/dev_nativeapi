import jwt from 'jwt-simple';

describe('Routes Peers', () => {
  const Peers = app.datasource.models.Peers;
  const Users = app.datasource.models.Users;
  const Profiles = app.datasource.models.Profiles;
  const Categories = app.datasource.models.Categories;
  const jwtSecret = app.config.jwtSecret;

  const defaultPeer = {
    id: 1,
    username: 1000,
    secret: 'voip1000',
    name: 'Peer 1000',
    email: '1000@mail.com',
    callCenter: false,
    hideOnAgenda: false,
    cc: 'Cost Center',
    profileId: 1,
    categoryId: 1,
  };

  const defaultProfile = {
    id: 1,
    name: 'Default Profile',
    description: 'Default Profile Description',
  };

  const defaultCategory = {
    id: 1,
    name: 'Default Category',
    nat: false,
    voicemail: false,
    lock: false,
    followme: false,
    monitor: 'all',
    callLimit: 10,
    timeout: 60,
    overflowExtension: 1001,
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
          .then(() => {
            Profiles.create(defaultProfile);
            Categories.create(defaultCategory);
          })
          .then(() => Peers.destroy({ where: {} })
            .then(() => {
              Peers.create(defaultPeer);
            })
            .then(() => {
              token = jwt.encode({ id: user.id }, jwtSecret);
              done();
            }));
      });
  });

  describe('Route GET /peers', () => {
    it('should return a list of peers', (done) => {
      const peersList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        username: Joi.number(),
        secret: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        callCenter: Joi.boolean(),
        hideOnAgenda: Joi.boolean(),
        cc: Joi.string(),
        profileId: Joi.number(),
        categoryId: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
        Profile: Joi.object(),
        Category: Joi.object(),
      }));
      request
        .get('/peers')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, peersList);
          done(err);
        });
    });
  });

  describe('Route GET /peers/{id}', () => {
    it('should return a peer', (done) => {
      const peer = Joi.object().keys({
        id: Joi.number(),
        username: Joi.number(),
        secret: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        callCenter: Joi.boolean(),
        hideOnAgenda: Joi.boolean(),
        cc: Joi.string(),
        profileId: Joi.number(),
        categoryId: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
        Profile: Joi.object(),
        Category: Joi.object(),
      });
      request
        .get('/peers/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, peer);
          done(err);
        });
    });
  });

  describe('Route POST /peers', () => {
    it('should create a peer', (done) => {
      const newPeer = {
        id: 2,
        username: 1001,
        secret: 'voip1001',
        name: 'Peer 1001',
        email: '1001@mail.com',
        callCenter: true,
        hideOnAgenda: true,
        cc: 'Cost Center1',
        profileId: 1,
        categoryId: 1,
      };

      const peer = Joi.object().keys({
        id: Joi.number(),
        username: Joi.number(),
        secret: Joi.string(),
        name: Joi.string(),
        email: Joi.string(),
        callCenter: Joi.boolean(),
        hideOnAgenda: Joi.boolean(),
        cc: Joi.string(),
        profileId: Joi.number(),
        categoryId: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
        Profile: Joi.object(),
        Category: Joi.object(),
      });

      request
        .post('/peers')
        .set('Authorization', `bearer ${token}`)
        .send(newPeer)
        .end((err, res) => {
          joiAssert(res.body, peer);
          done(err);
        });
    });
  });

  describe('Route PUT /peers/{id}', () => {
    it('should update a peer', (done) => {
      const updatedPeer = {
        id: 1,
        username: 1000,
        secret: 'voip1000',
        name: 'Peer 1000 UPDATED',
        email: '1000@mail.com',
        callCenter: false,
        hideOnAgenda: false,
        cc: 'Cost Center UPDATED',
        profileId: 1,
        categoryId: 1,
      };
      const updatedCount = Joi.array().items(1);
      request
        .put('/peers/1')
        .set('Authorization', `bearer ${token}`)
        .send(updatedPeer)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
          done(err);
        });
    });
  });

  describe('Route DELETE /peers/{id}', () => {
    it('should delete a peer', (done) => {
      request
        .delete('/peers/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});

