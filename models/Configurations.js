import differenceInDays from "date-fns/differenceInDays";

export default (sequelize, DataType) => {
  const Configurations = sequelize.define("Configurations", {
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
      allowNull: true,
    },
    usersLimit: {
      type: DataType.INTEGER,
      allowNull: true,
      default: 0,
    },
    peersLimit: {
      type: DataType.INTEGER,
      allowNull: true,
      default: 0,
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

  return Configurations;
};
