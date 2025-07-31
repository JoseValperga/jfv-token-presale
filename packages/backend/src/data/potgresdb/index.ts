// src/data/potgresdb/index.ts

import { defineUserModel, UserModel } from "./model/user.model";
import { PostgreDatabase } from "./postgres-database";

const initializePostgresModels = () => {
  const sequelize = PostgreDatabase.getInstance();
  defineUserModel(sequelize);
};

export {
  PostgreDatabase,
  UserModel,
  initializePostgresModels, // 👈 llamado desde app.ts
};
