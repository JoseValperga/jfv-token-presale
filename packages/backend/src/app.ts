import { PostgreDatabase, initializePostgresModels } from "./data/potgresdb";
import { server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await PostgreDatabase.connect();
  initializePostgresModels(); // Initialize the models
  const sequelize = PostgreDatabase.getInstance();
  await sequelize.sync({alter:true});
  server.start();
}
