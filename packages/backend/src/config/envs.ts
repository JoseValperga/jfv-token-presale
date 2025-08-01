import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  POSTGRES_DB: get("POSTGRES_DB").required().asString(),
  POSTGRES_USER: get("POSTGRES_USER").required().asString(),
  POSTGRES_PASSWORD: get("POSTGRES_PASSWORD").required().asString(),
  POSTGRES_HOST: get("POSTGRES_HOST").required().asString(),
  POSTGRES_PORT: get("POSTGRES_PORT").required().asPortNumber(),
  JWT_SECRET: get("JWT_SECRET").default("SEED").asString(),
  JWT_DURATION: get("JWT_DURATION").default("2h").asString(),
};
