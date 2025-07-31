import { UserModel } from "../../data/potgresdb";
import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthPostgreDataSourceImpl implements AuthDataSource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;
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
        role: registerUserDto.role || ["user"], // Default role if not provided
      });
      
      const prueba=await user.save();
      console.log("prueba", prueba);

      return new UserEntity(
        name,
        email,
        password,
        ["user"], // Default role, can be modified as needed
        undefined, // img can be set later
        undefined // token can be set later
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
