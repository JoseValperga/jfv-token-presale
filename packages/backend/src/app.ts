import { PostgreDatabase } from "./data/potgresdb";
import { server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  await PostgreDatabase.connect()
  server.start();
}
