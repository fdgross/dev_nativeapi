export default (sequelize, DataType) => {
  const Groups = sequelize.define('Groups', {
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
        Groups.belongsToMany(models.Peers, {
          through: 'GroupsPeers',
          as: 'Peers',
          onDelete: 'RESTRICT',
        });
      },
    },
  });

  return Groups;
};

