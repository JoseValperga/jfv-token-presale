import { UserModel } from "../../data/potgresdb";
import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthPostgreDataSourceImpl implements AuthDataSource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, role, img, token } = registerUserDto;
    try {
      const exist = await UserModel.findOne({ where: { email } });
      if (exist) {
        throw CustomError.badRequest("Email already exists");
      }
      // Create a new user in the database
      const user = await UserModel.create({
        name,
        email,
        password,
        role,
        img,
        token,
      });
      const newUser = user.dataValues;

      return new UserEntity(
        newUser.id,
        newUser.name,
        newUser.email,
        newUser.password,
        newUser.role,
        newUser.img,
        newUser.token,
        newUser.createdAt,
        newUser.updatedAt
      );
    } catch (error) {
      console.log("Error in register method:", error);
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError(
        "An error occurred while registering the user"
      );
    }
  }
}
