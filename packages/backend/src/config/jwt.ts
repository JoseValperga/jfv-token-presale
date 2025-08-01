import jwt, { SignOptions, Secret } from "jsonwebtoken";

export class JwtAdapter {
  static async generateToken(
    payload: object,
    duration: string = "2h"
  ): Promise<string | null> {
    const options: SignOptions = {
      expiresIn: duration as SignOptions["expiresIn"], // ✅ truco para que TS no se queje
      algorithm: "HS256",
    };

    const secret: Secret = process.env.JWT_SECRET || "SEED";

    return new Promise((resolve) => {
      //todo: generacion del seed

      jwt.sign(payload, secret, options, (err, token) => {
        if (err || !token) {
          console.error("Error generating JWT token:", err);
          return resolve(null);
        }
        resolve(token);
      });
    });
  }

  static validateToken(token: string) {
    return new Promise((resolve) => {
      jwt.verify(token, "SEED", (err, decoded) => {
        if (err) {
          console.error("Error validating JWT token:", err);
          return resolve(null);
        }
        resolve(decoded);
      });
    });
  }
}
