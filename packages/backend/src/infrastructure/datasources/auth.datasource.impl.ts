import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthDataSourceImpl implements AuthDataSource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { username, name, email, password } = registerUserDto;
    try {
      return new UserEntity(
        username,
        name,
        email,
        password,
        ["user"], // Default role, can be modified as needed
        undefined, // img can be set later
        undefined // token can be set later
      );
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServerError(
        "An error occurred while registering the user"
      );
    }

    // Here you would typically interact with a database or an external service
    // to register the user. For now, we will just return the DTO as is.
  }
}
