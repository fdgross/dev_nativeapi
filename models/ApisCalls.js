export default (sequelize, DataType) => {
  const ApisCalls = sequelize.define('ApisCalls', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    event: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    customEvent: {
      type: DataType.TEXT,
      allowNull: true,
    },
    verb: {
      type: DataType.STRING,
      allowNull: true,
    },
    method: {
      type: DataType.STRING,
      allowNull: true,
    },
    body: {
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
        ApisCalls.belongsTo(models.Apis, {
          foreignKey: 'apiId',
          as: 'Api',
          onDelete: 'RESTRICT',
        });
      },
    },
  });

  return ApisCalls;
};

