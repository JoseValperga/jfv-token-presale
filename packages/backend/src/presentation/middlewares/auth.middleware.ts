import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JwtAdapter } from "../../config";

export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const authorization = req.headers.authorization;

    if (!authorization) return res.status(401).json({ error: "Unauthorized" });

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Invalid token format" });
    }

    const token = authorization.split(" ")[1] || "";

    try {
      const payload = await JwtAdapter.validateToken(token);
      if (!payload) {
        return res.status(401).json({ error: "Invalid token" });
      }

      req.body.token = payload; // Agregar el token al cuerpo de la solicitud
      next();
      
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
