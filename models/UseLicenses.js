import differenceInDays from "date-fns/differenceInDays";

export default (sequelize, DataType) => {
  const UseLicenses = sequelize.define("UseLicenses", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    licenseKey: {
      type: DataType.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    expirationDate: {
      type: DataType.DATE,
      allowNull: false,
    },
    hardDiskSerial: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataType.DATE,
      allowNull: false,
    },
    expirationDays: {
      type: DataType.VIRTUAL,
      get() {
        return differenceInDays(
          new Date(this.getDataValue("expirationDate")),
          new Date(),
        );
      },
    },
  });

  return UseLicenses;
};
