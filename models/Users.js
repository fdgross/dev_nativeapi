import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
  const Users = sequelize.define(
    'Users', {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataType.STRING,
        allowNull: true,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      callcenter: {
        type: DataType.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataType.STRING,
        allowNull: true,
      },
    },
    {
      classMethods: {
        associate: (models) => {
          Users.belongsToMany(models.Permissions, {
            through: 'UsersPermissions',
            as: 'Permissions',
            onDelete: 'CASCADE',
          });
          Users.belongsToMany(models.CostCenters, {
            through: 'UsersCostCenters',
            as: 'CostCenters',
            onDelete: 'CASCADE',
          });
        },
      },
    },
  );

  Users.isPassword = (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword);

  return Users;
};
