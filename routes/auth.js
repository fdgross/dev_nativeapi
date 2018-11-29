import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

export default (app) => {
  const config = app.config;
  const Users = app.datasource.models.Users;
  const Permissions = app.datasource.models.Permissions;

  app.post('/token', (req, res) => {
    if (req.body.username && req.body.password) {
      const username = req.body.username;
      const password = req.body.password;

      Users.findOne({
        include: [
          {
            model: Permissions,
            as: 'Permissions',
            through: { attributes: [] }, // HIDE ASSOCIATION
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        ],
        where: { username },
      })
        .then((user) => {
          if (Users.isPassword(user.password, password)) {
            const payload = { id: user.id };
            // eslint-disable-next-line no-array-constructor
            const permissions = [];
            // eslint-disable-next-line func-names
            user.Permissions.forEach((permission) => {
              permissions.push(permission.name);
            });
            res.json({
              user: {
                id: user.id,
                username: user.username,
                name: user.name,
                avatar: user.avatar,
                permissions,
              },
              token: jwt.encode(payload, config.jwtSecret),
            });
          } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
          }
        })
        .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
    } else {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }
  });
};
