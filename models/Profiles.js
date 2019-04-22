export default (sequelize, DataType) => {
  const Profiles = sequelize.define('Profiles', {
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
    description: {
      type: DataType.TEXT,
      allowNull: true,
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
    classMethods: {
      associate: (models) => {
        Profiles.belongsToMany(models.OutRoutes, {
          through: 'OutRoutesProfiles',
          as: 'OutRoutes',
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return Profiles;
};

