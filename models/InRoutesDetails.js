export default (sequelize, DataType) => {
  const InRoutesDetails = sequelize.define('InRoutesDetails', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mask: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    remove: {
      type: DataType.INTEGER,
      allowNull: true,
    },
    add: {
      type: DataType.STRING,
      allowNull: true,
    },
    destinationType: {
      type: DataType.STRING,
      allowNull: false,
    },
    destination: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  return InRoutesDetails;
};

