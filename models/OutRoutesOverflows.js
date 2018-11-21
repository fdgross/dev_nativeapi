export default (sequelize, DataType) => {
  const OutRoutesOverflows = sequelize.define('OutRoutesOverflows', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    remove: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    add: {
      type: DataType.STRING,
      allowNull: true,
    },
    busy: {
      type: DataType.BOOLEAN,
      allowNull: true,
    },
    fail: {
      type: DataType.BOOLEAN,
      allowNull: true,
    },
    trunkLimit: {
      type: DataType.BOOLEAN,
      allowNull: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        OutRoutesOverflows.belongsTo(models.Trunks, {
          foreignKey: 'trunkId',
          as: 'Trunk',
          onDelete: 'RESTRICT',
        });
      },
    },
  });

  return OutRoutesOverflows;
};

