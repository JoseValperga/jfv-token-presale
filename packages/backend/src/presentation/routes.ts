/*Rutas de toda la aplicación*/

import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    // Aquí definimos las rutas de la aplicación
    router.use("/api/auth", AuthRoutes.routes);
    return router;
  }
}
