export default (sequelize, DataType) => {
  const Callbacks = sequelize.define('Callbacks', {
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
    message: {
      type: DataType.STRING,
      allowNull: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Callbacks.belongsTo(models.Profiles, {
          foreignKey: 'profileId',
          as: 'Profile',
          onDelete: 'RESTRICT',
        });
      },
    },
  });

  return Callbacks;
};

