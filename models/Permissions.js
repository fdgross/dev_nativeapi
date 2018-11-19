export default (sequelize, DataType) => {
  const Permissions = sequelize.define('Permissions', {
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
  }, {
    classMethods: {
      associate: (models) => {
        Permissions.belongsToMany(models.Users, {
          through: 'UsersPermissions',
          as: 'Users',
          onDelete: 'CASCADE',
        });
      },
    },
  });
  return Permissions;
};
