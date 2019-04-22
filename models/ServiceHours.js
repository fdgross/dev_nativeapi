export default (sequelize, DataType) => {
  const ServiceHours = sequelize.define('ServiceHours', {
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
    message: {
      type: DataType.STRING,
      allowNull: true,
    },
    sendTo: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    sendToValue: {
      type: DataType.STRING,
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
        ServiceHours.belongsToMany(models.Queues, {
          through: 'QueuesServiceHours',
          as: 'Queues',
          onDelete: 'CASCADE',
        });
        ServiceHours.belongsToMany(models.Ivrs, {
          through: 'IvrsServiceHours',
          as: 'Ivrs',
          onDelete: 'CASCADE',
        });
        ServiceHours.hasMany(models.ServiceHoursDetails, {
          foreignKey: 'serviceHourId',
          as: 'ServiceHoursDetails',
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return ServiceHours;
};

