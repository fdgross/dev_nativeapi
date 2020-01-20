export default (sequelize, DataType) => {
  const Breaks = sequelize.define("Breaks", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
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
    requiresApproval: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
    requiresJustification: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
    requiresExceedanceJustification: {
      type: DataType.BOOLEAN,
      allowNull: false,
    },
    estimatedTime: {
      type: DataType.INTEGER,
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
  });

  return Breaks;
};
