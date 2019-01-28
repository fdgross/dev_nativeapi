export default (sequelize, DataType) => {
  const Features = sequelize.define('Features', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    feature: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    value: {
      type: DataType.STRING,
      allowNull: true,
      unique: true,
    },
  });

  return Features;
};

