export default (sequelize, DataType) => {
  const Peers = sequelize.define('Peers', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataType.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    secret: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataType.STRING,
      allowNull: true,
    },
    callCenter: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hideOnAgenda: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sipRegStatus: {
      type: DataType.STRING,
      allowNull: true,
    },
    sipIp: {
      type: DataType.STRING,
      allowNull: true,
    },
    iaxRegStatus: {
      type: DataType.STRING,
      allowNull: true,
    },
    iaxIp: {
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
        Peers.belongsTo(models.Profiles, {
          foreignKey: 'profileId',
          as: 'Profile',
          onDelete: 'RESTRICT',
        });
        Peers.belongsTo(models.Categories, {
          foreignKey: 'categoryId',
          as: 'Category',
          onDelete: 'RESTRICT',
        });
        Peers.belongsTo(models.CostCenters, {
          foreignKey: 'costCenterId',
          as: 'CostCenter',
          onDelete: 'RESTRICT',
        });
        Peers.belongsToMany(models.Groups, {
          through: 'GroupsPeers',
          as: 'Groups',
          onDelete: 'CASCADE',
        });
        Peers.belongsToMany(models.Queues, {
          through: 'PeersQueues',
          as: 'Queues',
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return Peers;
};
