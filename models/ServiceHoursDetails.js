export default (sequelize, DataType) => {
  const ServiceHoursDetails = sequelize.define('ServiceHoursDetails', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    startTime: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    endTime: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dows: {
      type: DataType.STRING,
      allowNull: true,
    },
  });

  return ServiceHoursDetails;
};

