import jwt from 'jwt-simple';

describe('Routes Categories', () => {
  const Categories = app.datasource.models.Categories;
  const Peers = app.datasource.models.Peers;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

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
        Peers.destroy({ where: {} })
          .then(Categories.destroy({ where: {} })
            .then(() => Categories.create(defaultCategory))
            .then(() => {
              token = jwt.encode({ id: user.id }, jwtSecret);
              done();
            }));
      });
  });

  describe('Route GET /categories', () => {
    it('should return a list of categories', (done) => {
      request
        .get('/categories')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultCategory.id);
          expect(res.body[0].name).to.be.eql(defaultCategory.name);
          expect(res.body[0].nat).to.be.eql(defaultCategory.nat);
          expect(res.body[0].voicemail).to.be.eql(defaultCategory.voicemail);
          expect(res.body[0].lock).to.be.eql(defaultCategory.lock);
          expect(res.body[0].followme).to.be.eql(defaultCategory.followme);
          expect(res.body[0].monitor).to.be.eql(defaultCategory.monitor);
          expect(res.body[0].callLimit).to.be.eql(defaultCategory.callLimit);
          expect(res.body[0].timeout).to.be.eql(defaultCategory.timeout);
          expect(res.body[0].overflowExtension).to.be.eql(defaultCategory.overflowExtension);
          done(err);
        });
    });
  });

  describe('Route GET /categories/{id}', () => {
    it('should return a category', (done) => {
      request
        .get('/categories/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultCategory.id);
          expect(res.body.name).to.be.eql(defaultCategory.name);
          expect(res.body.nat).to.be.eql(defaultCategory.nat);
          expect(res.body.voicemail).to.be.eql(defaultCategory.voicemail);
          expect(res.body.lock).to.be.eql(defaultCategory.lock);
          expect(res.body.followme).to.be.eql(defaultCategory.followme);
          expect(res.body.monitor).to.be.eql(defaultCategory.monitor);
          expect(res.body.callLimit).to.be.eql(defaultCategory.callLimit);
          expect(res.body.timeout).to.be.eql(defaultCategory.timeout);
          expect(res.body.overflowExtension).to.be.eql(defaultCategory.overflowExtension);
          done(err);
        });
    });
  });

  describe('Route POST /categories', () => {
    it('should create a category', (done) => {
      const newCategory = {
        id: 2,
        name: 'New Category',
        nat: false,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1001,
      };
      request
        .post('/categories')
        .set('Authorization', `bearer ${token}`)
        .send(newCategory)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newCategory.id);
          expect(res.body.name).to.be.eql(newCategory.name);
          expect(res.body.nat).to.be.eql(newCategory.nat);
          expect(res.body.voicemail).to.be.eql(newCategory.voicemail);
          expect(res.body.lock).to.be.eql(newCategory.lock);
          expect(res.body.followme).to.be.eql(newCategory.followme);
          expect(res.body.monitor).to.be.eql(newCategory.monitor);
          expect(res.body.callLimit).to.be.eql(newCategory.callLimit);
          expect(res.body.timeout).to.be.eql(newCategory.timeout);
          expect(res.body.overflowExtension).to.be.eql(newCategory.overflowExtension);
          done(err);
        });
    });
  });

  describe('Route PUT /categories/{id}', () => {
    it('should update a category', (done) => {
      const updatedCategory = {
        id: 1,
        name: 'Updated Category',
        nat: false,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1001,
      };
      request
        .put('/categories/1')
        .set('Authorization', `bearer ${token}`)
        .send(updatedCategory)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);
          done(err);
        });
    });
  });

  describe('Route DELETE /categories/{id}', () => {
    it('should delete a category', (done) => {
      request
        .delete('/categories/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);
          done(err);
        });
    });
  });
});
