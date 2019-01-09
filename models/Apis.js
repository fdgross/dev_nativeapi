export default (sequelize, DataType) => {
  const Apis = sequelize.define('Apis', {
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
    baseUrl: {
      type: DataType.STRING,
      allowNull: false,
    },
    authentication: {
      type: DataType.STRING,
      allowNull: true,
    },
    user: {
      type: DataType.STRING,
      allowNull: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: true,
    },
    token: {
      type: DataType.STRING,
      allowNull: true,
    },
  });

  return Apis;
};

