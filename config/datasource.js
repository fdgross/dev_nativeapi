import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

let database = null;

const loadModels = sequelize => {
  const dir = path.join(__dirname, "../models");
  const models = [];

  const CLASSMETHODS = "classMethods";
  const ASSOCIATE = "associate";

  fs.readdirSync(dir).forEach(file => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });

  Object.keys(models).forEach(modelName => {
    if (CLASSMETHODS in models[modelName].options) {
      if (ASSOCIATE in models[modelName].options[CLASSMETHODS]) {
        models[modelName].options.classMethods.associate(models);
      }
    }
  });

  return models;
};

export default app => {
  if (!database) {
    const config = app.config;
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params,
    );
    database = {
      sequelize,
      Sequelize,
      models: {},
    };

    database.models = loadModels(sequelize);

    sequelize.sync({}).done(() => database);
  }
  return database;
};
