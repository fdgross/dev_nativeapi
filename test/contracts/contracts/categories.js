import jwt from 'jwt-simple';

describe('Routes Categories', () => {
  const Categories = app.datasource.models.Categories;
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
        Categories.destroy({ where: {} })
          .then(() => Categories.create(defaultCategory))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /categories', () => {
    it('should return a list of categories', (done) => {
      const categoriesList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        nat: Joi.boolean(),
        voicemail: Joi.boolean(),
        lock: Joi.boolean(),
        followme: Joi.boolean(),
        monitor: Joi.string(),
        callLimit: Joi.number(),
        timeout: Joi.number(),
        overflowExtension: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      }));
      request
        .get('/categories')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, categoriesList);
          done(err);
        });
    });
  });

  describe('Route GET /categories/{id}', () => {
    it('should return a category', (done) => {
      const category = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        nat: Joi.boolean(),
        voicemail: Joi.boolean(),
        lock: Joi.boolean(),
        followme: Joi.boolean(),
        monitor: Joi.string(),
        callLimit: Joi.number(),
        timeout: Joi.number(),
        overflowExtension: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });
      request
        .get('/categories/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          joiAssert(res.body, category);
          done(err);
        });
    });
  });

  describe('Route POST /categories', () => {
    it('should create a category', (done) => {
      const newCategory = {
        id: 2,
        name: 'New Category',
        nat: true,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1000,
      };

      const category = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        nat: Joi.boolean(),
        voicemail: Joi.boolean(),
        lock: Joi.boolean(),
        followme: Joi.boolean(),
        monitor: Joi.string(),
        callLimit: Joi.number(),
        timeout: Joi.number(),
        overflowExtension: Joi.number(),
        createdAt: Joi.date().iso(),
        updatedAt: Joi.date().iso(),
      });

      request
        .post('/categories')
        .set('Authorization', `bearer ${token}`)
        .send(newCategory)
        .end((err, res) => {
          joiAssert(res.body, category);
          done(err);
        });
    });
  });

  describe('Route PUT /categories/{id}', () => {
    it('should update a category', (done) => {
      const updatedCategory = {
        id: 1,
        name: 'Updated Category',
        nat: true,
        voicemail: false,
        lock: false,
        followme: false,
        monitor: 'all',
        callLimit: 10,
        timeout: 60,
        overflowExtension: 1000,
      };
      const updatedCount = Joi.array().items(1);
      request
        .put('/categories/1')
        .set('Authorization', `bearer ${token}`)
        .send(updatedCategory)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);
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

