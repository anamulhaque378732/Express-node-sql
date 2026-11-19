import app from "./app.js";
import config from "./config/index.js";
import { inintDB } from "./DB/index.js";

const main = async () => {
  inintDB();

  app.listen(config.port, () => {
    console.log(`The express server is running on port ${config.port}`);
  });
};

main();
