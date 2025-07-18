import express, { Router } from "express";
import { envs } from "../config/envs";  
import { AppRoutes } from "./routes";

interface Options {
  port?: number;
  routes: Router
}

class _Server {
  public readonly app = express();
  private readonly port: number;
  private readonly _routes: Router;

  constructor(options: Options) {
    // Desestructuramos las opciones para obtener el puerto y las rutas
    // Si no se especifica un puerto, usamos 3100 por defecto
    // Si no se especifican rutas, se lanzará un error al intentar usar el servidor
         
    const { port = 3100, routes } = options;
    this.port = port;
    this._routes = routes;
    this.configure();
  }

  private configure() {
    // Aquí irán middlewares globales, como JSON parsing, CORS, etc.
    this.app.use(express.json());
  }

  public start() {
    // Aquí se monta el router de rutas
    this.app.use(this._routes);
   
    // Aquí se inicia el servidor
    this.app.listen(this.port, () => {
      console.log(`🚀 Server is running on http://localhost:${this.port}`);
    });
  }
}

export const server = new _Server({ port: envs.PORT, routes: AppRoutes.routes });
