/*Rutas de autenticación*/
import { Router } from "express";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    // Aquí definimos las rutas de la aplicación

    router.post("/login", (req, res) => {
      res.json({ message: "Login endpoint" });
    });
    
    router.post("/register", (req, res) => {
      res.json({ message: "Register endpoint" });
    });

    return router;
  }
}
