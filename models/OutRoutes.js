export default (sequelize, DataType) => {
  const OutRoutes = sequelize.define('OutRoutes', {
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
        OutRoutes.belongsToMany(models.Profiles, {
          through: 'OutRoutesProfiles',
          as: 'Profiles',
          onDelete: 'RESTRICT',
        });
        OutRoutes.hasMany(models.OutRoutesDetails, {
          foreignKey: 'outRouteId',
          as: 'OutRouteDetails',
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return OutRoutes;
};
