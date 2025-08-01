import jwt, { SignOptions, Secret } from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SECRET = envs.JWT_SECRET || "SEED";
const JWT_DURATION = envs.JWT_DURATION || "2h";

export class JwtAdapter {
  static async generateToken(
    payload: object,
    duration: string = JWT_DURATION
  ): Promise<string | null> {
    const options: SignOptions = {
      expiresIn: duration as SignOptions["expiresIn"], // ✅ truco para que TS no se queje
      algorithm: "HS256",
    };

    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SECRET, options, (err, token) => {
        if (err || !token) {
          console.error("Error generating JWT token:", err);
          return resolve(null);
        }
        resolve(token);
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
          console.error("Error validating JWT token:", err);
          return resolve(null);
        }
        resolve(decoded as T);
      });
    });
  }
}
