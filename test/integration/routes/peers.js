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
      request
        .get('/peers')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultPeer.id);
          expect(res.body[0].username).to.be.eql(defaultPeer.username);
          expect(res.body[0].secret).to.be.eql(defaultPeer.secret);
          expect(res.body[0].name).to.be.eql(defaultPeer.name);
          expect(res.body[0].email).to.be.eql(defaultPeer.email);
          expect(res.body[0].callCenter).to.be.eql(defaultPeer.callCenter);
          expect(res.body[0].hideOnAgenda).to.be.eql(defaultPeer.hideOnAgenda);
          expect(res.body[0].cc).to.be.eql(defaultPeer.cc);
          expect(res.body[0].profileId).to.be.eql(defaultPeer.profileId);
          expect(res.body[0].categoryId).to.be.eql(defaultPeer.categoryId);
          done(err);
        });
    });
  });

  describe('Route GET /peers/{id}', () => {
    it('should return a peer', (done) => {
      request
        .get('/peers/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultPeer.id);
          expect(res.body.username).to.be.eql(defaultPeer.username);
          expect(res.body.secret).to.be.eql(defaultPeer.secret);
          expect(res.body.name).to.be.eql(defaultPeer.name);
          expect(res.body.email).to.be.eql(defaultPeer.email);
          expect(res.body.callCenter).to.be.eql(defaultPeer.callCenter);
          expect(res.body.hideOnAgenda).to.be.eql(defaultPeer.hideOnAgenda);
          expect(res.body.cc).to.be.eql(defaultPeer.cc);
          expect(res.body.profileId).to.be.eql(defaultPeer.profileId);
          expect(res.body.categoryId).to.be.eql(defaultPeer.categoryId);
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
      request
        .post('/peers')
        .set('Authorization', `bearer ${token}`)
        .send(newPeer)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newPeer.id);
          expect(res.body.username).to.be.eql(newPeer.username);
          expect(res.body.secret).to.be.eql(newPeer.secret);
          expect(res.body.name).to.be.eql(newPeer.name);
          expect(res.body.email).to.be.eql(newPeer.email);
          expect(res.body.callCenter).to.be.eql(newPeer.callCenter);
          expect(res.body.hideOnAgenda).to.be.eql(newPeer.hideOnAgenda);
          expect(res.body.cc).to.be.eql(newPeer.cc);
          expect(res.body.profileId).to.be.eql(newPeer.profileId);
          expect(res.body.categoryId).to.be.eql(newPeer.categoryId);
          done(err);
        });
    });
  });

  describe('Route PUT /peers/{id}', () => {
    it('should update a peer', (done) => {
      const updatedPeer = {
        id: 1,
        name: 'Updated Peer',
      };
      request
        .put('/peers/1')
        .set('Authorization', `bearer ${token}`)
        .send(updatedPeer)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
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
