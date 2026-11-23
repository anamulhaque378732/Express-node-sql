import dotenv from "dotenv";

import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  port: process.env.PORT,
  connection_string: process.env.DATABASE_URL as string,
  accessToken: process.env.ACCESS_TOKEN as string,
  refreshToken: process.env.REFRESH_TOKEN as string,
};

export default config;
