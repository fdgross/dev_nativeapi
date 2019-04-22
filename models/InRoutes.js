export default (sequelize, DataType) => {
  const InRoutes = sequelize.define('InRoutes', {
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
        InRoutes.hasMany(models.InRoutesDetails, {
          foreignKey: 'InRouteId',
          as: 'InRouteDetails',
          onDelete: 'CASCADE',
        });
        InRoutes.belongsTo(models.Trunks, {
          foreignKey: 'trunkId',
          as: 'TrunkId',
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return InRoutes;
};
