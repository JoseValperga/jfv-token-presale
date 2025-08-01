import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/potgresdb";

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
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) {
        return res.status(401).json({ error: "Invalid token" });
      }

      const user = await UserModel.findByPk(payload.id);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      req.body.user = user; // Agregar el usuario al cuerpo de la solicitud
      next();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}
