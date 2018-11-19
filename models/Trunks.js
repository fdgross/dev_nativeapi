export default (sequelize, DataType) => {
  const Op = sequelize.Op;
  const Trunks = sequelize.define('Trunks', {
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
    type: {
      type: DataType.ENUM('SIP', 'IAX2', 'KHOMP'),
      allowNull: false,
    },
    user: {
      type: DataType.STRING,
      allowNull: true,
    },
    secret: {
      type: DataType.STRING,
      allowNull: true,
    },
    ip: {
      type: DataType.STRING,
      allowNull: true,
    },
    nat: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sendRegistry: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    receiveRegistry: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    codec1: {
      type: DataType.STRING,
      allowNull: true,
    },
    codec2: {
      type: DataType.STRING,
      allowNull: true,
    },
    codec3: {
      type: DataType.STRING,
      allowNull: true,
    },
    codec4: {
      type: DataType.STRING,
      allowNull: true,
    },
    extras: {
      type: DataType.TEXT,
      allowNull: true,
    },
    board: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    tech: {
      type: DataType.STRING,
      allowNull: true,
    },
    channels: {
      type: DataType.STRING,
      allowNull: true,
    },
    allocation: {
      type: DataType.STRING,
      allowNull: true,
    },
  }, {
    scopes: {
      defaultTrunk: {
        attributes: [
          'id',
          'name',
          'type',
          'createdAt',
          'updatedAt',
        ],
      },
      trunkKhomp: {
        attributes: [
          'board',
          'tech',
          'channels',
          'allocation',
        ],
        where: {
          type: 'KHOMP',
        },
      },
      trunkSipIax: {
        attributes: [
          'user',
          'secret',
          'ip',
          'nat',
          'sendRegistry',
          'receiveRegistry',
          'codec1',
          'codec2',
          'codec3',
          'codec4',
          'extras',
        ],
        where: {
          type: {
            [Op.or]: ['SIP', 'IAX2'],
          },
        },
      },
    },
  });

  return Trunks;
};
