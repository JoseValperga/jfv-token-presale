import { server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  server.start();
}
