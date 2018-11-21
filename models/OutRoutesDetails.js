export default (sequelize, DataType) => {
  const OutRoutesDetails = sequelize.define('OutRoutesDetails', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    callType: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    mask: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    remove: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    add: {
      type: DataType.STRING,
      allowNull: true,
    },
    externalCode: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    enabled: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        OutRoutesDetails.belongsTo(models.Trunks, {
          foreignKey: 'trunkId',
          as: 'Trunk',
          onDelete: 'RESTRICT',
        });
        OutRoutesDetails.hasMany(models.OutRoutesOverflows, {
          foreignKey: 'outRouteOverflowId',
          as: 'OutRouteOverflows',
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return OutRoutesDetails;
};

