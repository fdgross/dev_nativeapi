export default (sequelize, DataType) => {
  const InternalRoutes = sequelize.define('InternalRoutes', {
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
        InternalRoutes.hasMany(models.InternalRoutesDetails, {
          foreignKey: 'InternalRouteId',
          as: 'InternalRoutesDetails',
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return InternalRoutes;
};
