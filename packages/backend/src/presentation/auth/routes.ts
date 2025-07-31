/*Rutas de autenticación*/
import { Router } from "express";
import { AuthController } from "./controller";
import {
  AuthPostgreDataSourceImpl,
  AuthRepositoryImpl,
} from "../../infrastructure";
import { BcryptAdapter } from "../../config";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const datasource = new AuthPostgreDataSourceImpl(
      BcryptAdapter.hash,
      BcryptAdapter.compare
    );
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    // Aquí definimos las rutas de la aplicación

    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    return router;
  }
}
