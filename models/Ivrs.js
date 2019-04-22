export default (sequelize, DataType) => {
  const Ivrs = sequelize.define('Ivrs', {
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
    extension: {
      type: DataType.INTEGER,
      unique: true,
      allowNull: true,
    },
    type: {
      type: DataType.STRING,
      allowNull: true,
    },
    mode: {
      type: DataType.STRING,
      allowNull: true,
    },
    basicDefinition: {
      type: DataType.TEXT,
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
        Ivrs.hasMany(models.IvrsDetails, {
          foreignKey: 'ivrId',
          as: 'IvrDetails',
          onDelete: 'CASCADE',
        });
      },
    },
  });

  return Ivrs;
};
