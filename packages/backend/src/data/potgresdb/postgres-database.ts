import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export class PostgreDatabase {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!PostgreDatabase.instance) {
      PostgreDatabase.instance = new Sequelize(
        process.env.POSTGRES_DB || "",
        process.env.POSTGRES_USER || "",
        process.env.POSTGRES_PASSWORD || "",
        {
          host: process.env.POSTGRES_HOST || "localhost",
          port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
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

