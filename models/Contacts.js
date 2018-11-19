export default (sequelize, DataType) => {
  const Contacts = sequelize.define('Contacts', {
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
    company: {
      type: DataType.STRING,
      allowNull: true,
    },
    department: {
      type: DataType.STRING,
      allowNull: true,
    },
    phone: {
      type: DataType.STRING,
      allowNull: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: true,
    },
    shared: {
      type: DataType.BOOLEAN,
      defaultValue: false,
    },
    owner: {
      type: DataType.INTEGER,
      defaultValue: 0,
    },
  });

  return Contacts;
};

