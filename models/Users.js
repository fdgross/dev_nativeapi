import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
  const Users = sequelize.define('Users', {
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
      unique: 'username_deletedAt',
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
    administrator: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    deletedAt: {
      type: DataType.DATE,
      allowNull: false,
      defaultValue: '1970-01-01 00:00:00',
      unique: 'username_deletedAt',
    },
    createdBy: {
      type: DataType.STRING,
      allowNull: true,
    },
    updatedBy: {
      type: DataType.STRING,
      allowNull: true,
    },
  }, {
    paranoid: true,
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
        Users.belongsTo(models.Peers, {
          foreignKey: 'peerId',
          as: 'Peer',
        });
      },
    },
    hooks: {
      beforeCreate: (user) => {
        user.set('password', bcrypt.hashSync(user.password, bcrypt.genSaltSync()));
      },
      beforeUpdate: (user) => {
        if (user.password.length === 60) {
          delete user.password;
        } else {
          user.set('password', bcrypt.hashSync(user.password, bcrypt.genSaltSync()));
        }
      },
    },
  });

  Users.isPassword = (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword);

  return Users;
};
