/*Rutas de autenticación*/
import { Router } from "express";
import { AuthController } from "./controller";
import { AuthPostgreDataSourceImpl, AuthRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new AuthPostgreDataSourceImpl(); // Asumiendo que AuthDataSource está implementado
    const authRepository = new AuthRepositoryImpl(datasource); // Asumiendo que AuthRepository está implementado
    const controller = new AuthController(authRepository);

    // Aquí definimos las rutas de la aplicación

    router.post("/login", controller.loginUser)
    router.post("/register", controller.registerUser);

    return router;
  }
}
