export default (sequelize, DataType) => {
  const IvrsDetails = sequelize.define('IvrsDetails', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    command: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    parameters: {
      type: DataType.TEXT,
      allowNull: true,
    },
    line: {
      type: DataType.STRING,
      allowNull: true,
    },
  });

  return IvrsDetails;
};

