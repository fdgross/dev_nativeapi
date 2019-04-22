export default (sequelize, DataType) => {
  const Events = sequelize.define('Events', {
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
    dateStart: {
      type: DataType.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dateEnd: {
      type: DataType.DATE,
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
        Events.belongsToMany(models.Queues, {
          through: 'QueuesEvents',
          as: 'Queues',
          onDelete: 'CASCADE',
        });
        Events.belongsToMany(models.Ivrs, {
          through: 'IvrsEvents',
          as: 'Ivrs',
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return Events;
};

