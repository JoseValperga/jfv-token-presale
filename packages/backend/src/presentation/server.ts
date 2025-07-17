import express from "express";
import { envs } from "../config/envs";  

interface Options {
  port?: number;
}

class _Server {
  public readonly app = express();
  private readonly port: number;

  constructor(options: Options) {
    const { port = 3100 } = options;
    this.port = port;
    this.configure();
  }

  private configure() {
    // Aquí irán middlewares globales, como JSON parsing, CORS, etc.
    this.app.use(express.json());
  }

  public start() {
    this.app.listen(this.port, () => {
      console.log(`🚀 Server is running on http://localhost:${this.port}`);
    });
  }
}

export const server = new _Server({ port: envs.PORT });
