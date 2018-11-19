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
    csp: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    externalCode: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    overflow: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    overflowOnBusy: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    overflowOnCongestion: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    overflowOnChanUnavail: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    overflowOnCount: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        OutRoutesDetails.belongsTo(models.Trunks, {
          foreignKey: 'trunkId',
          as: 'Trunk',
          onDelete: 'RESTRICT',
        });
      },
    },
  });

  return OutRoutesDetails;
};

