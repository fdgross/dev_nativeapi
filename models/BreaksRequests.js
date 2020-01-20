export default (sequelize, DataType) => {
  const BreaksRequests = sequelize.define(
    "BreaksRequests",
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      active: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      awaitingApproval: {
        type: DataType.BOOLEAN,
        allowNull: false,
      },
      approved: {
        type: DataType.BOOLEAN,
        allowNull: true,
      },
      justification: {
        type: DataType.STRING,
        allowNull: true,
      },
      exceedanceJustification: {
        type: DataType.STRING,
        allowNull: true,
      },
      time: {
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
    },
    {
      classMethods: {
        associate: models => {
          BreaksRequests.belongsTo(models.Breaks, {
            foreignKey: "breakId",
            as: "Break",
            onDelete: "RESTRICT",
          });

          BreaksRequests.belongsTo(models.Users, {
            foreignKey: "userId",
            as: "User",
            onDelete: "RESTRICT",
          });
        },
      },
    },
  );

  return BreaksRequests;
};
