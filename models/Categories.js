export default (sequelize, DataType) => {
  const Categories = sequelize.define('Categories', {
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
    nat: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    voicemail: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    lock: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    followme: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    passwordCall: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
      },
    },
    monitor: {
      type: DataType.STRING,
      allowNull: false,
      defaultValue: 'no',
      validate: {
        notEmpty: true,
      },
    },
    callLimit: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        notEmpty: true,
      },
    },
    timeout: {
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 60,
      validate: {
        notEmpty: true,
      },
    },
    overflowExtension: {
      type: DataType.INTEGER,
      allowNull: true,
    },
  });

  return Categories;
};

