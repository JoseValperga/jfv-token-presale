import { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  RegisterUserDto,
  RegisterUser,
} from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/potgresdb";

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log("Unexpected error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    res.json({ message: "Login endpoint controller" });
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.findAll()
      .then((users) => res.json({ user: req.body.user }))
      .catch(() => res.status(500).json({ error: "Internal server error" }));
  };
}
