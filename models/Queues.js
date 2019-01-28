export default (sequelize, DataType) => {
  const Queues = sequelize.define('Queues', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataType.TEXT,
      allowNull: true,
    },
    strategy: {
      type: DataType.ENUM('ringall', 'leastrecent', 'fewestcalls', 'random', 'rrmemory', 'linear'),
      defaultValue: 'rrmemory',
      allowNull: false,
    },
    ringTimeout: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    ringTone: {
      type: DataType.ENUM('never', 'always', 'ring'),
      defaultValue: 'never',
      allowNull: false,
    },
    announceFrequency: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    announceHoldtime: {
      type: DataType.BOOLEAN,
      allowNull: true,
    },
    announcePosition: {
      type: DataType.BOOLEAN,
      allowNull: true,
    },
    monitor: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    monitorInherit: {
      type: DataType.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    extension: {
      type: DataType.INTEGER,
      unique: true,
      allowNull: true,
    },
    joinEmpty: {
      type: DataType.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    overflowExtension: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    queueTimeout: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    queueMaxSize: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    callcenter: {
      type: DataType.ENUM('no', 'inbound', 'outbound'),
      defaultValue: 'no',
      allowNull: false,
    },
    periodicAnnounce: {
      type: DataType.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    periodicAnnounceAudio: {
      type: DataType.STRING,
      allowNull: true,
    },
    periodicAnnounceFrequency: {
      type: DataType.INTEGER,
      allowNull: true,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Queues.belongsToMany(models.Peers, {
          through: 'PeersQueues',
          as: 'Peers',
          onDelete: 'CASCADE',
        });
        Queues.belongsToMany(models.Users, {
          through: 'UsersQueues',
          as: 'Users',
          onDelete: 'CASCADE',
        });
        Queues.belongsToMany(models.Events, {
          through: 'QueuesEvents',
          as: 'Events',
          onDelete: 'CASCADE',
        });
        Queues.belongsToMany(models.ServiceHours, {
          through: 'QueuesServiceHours',
          as: 'ServiceHours',
          onDelete: 'CASCADE',
        });
        Queues.belongsToMany(models.Ivrs, {
          through: 'QueuesIvrsBefore',
          as: 'CustomRulesBefore',
          onDelete: 'CASCADE',
        });
        Queues.belongsToMany(models.Ivrs, {
          through: 'QueuesIvrsAfter',
          as: 'CustomRulesAfter',
          onDelete: 'CASCADE',
        });
        Queues.belongsTo(models.Mohs, {
          foreignKey: 'mohId',
          as: 'Moh',
          onDelete: 'RESTRICT',
        });
      },
    },
  });

  return Queues;
};

