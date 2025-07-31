import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { envs } from "../../config";
const { POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_HOST } = envs;

dotenv.config();

export class PostgreDatabase {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!PostgreDatabase.instance) {
      PostgreDatabase.instance = new Sequelize(
        POSTGRES_DB,
        POSTGRES_USER,
        POSTGRES_PASSWORD,
        {
          host: POSTGRES_HOST,
          port: POSTGRES_PORT,
          dialect: "postgres",
          logging: false,
        }
      );
    }

    return PostgreDatabase.instance;
  }

  public static async connect(): Promise<void> {
    try {
      await PostgreDatabase.getInstance().authenticate();
      console.log("✅ Conexión con PostgreSQL establecida correctamente.");
    } catch (error) {
      console.error("❌ No se pudo conectar a la base de datos:", error);
    }
  }
}

