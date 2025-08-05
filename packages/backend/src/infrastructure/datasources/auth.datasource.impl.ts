import { UserModel } from "../../data/potgresdb";
import {
  AuthDataSource,
  CustomError,
  RegisterUserDto,
  LoginUserDto,
  UserEntity,
} from "../../domain";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthPostgreDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction,
    private readonly comparePassword: CompareFunction
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password, role, img, token } = registerUserDto;

    try {
      const exist = await UserModel.findOne({ where: { email } });
      if (exist) {
        throw CustomError.badRequest("Wrong credentials");
      }
      // Create a new user in the database
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
        role,
        img,
        token,
      });
      const newUser = user.dataValues;
      return UserMapper.userEntityFromObject(newUser);
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
  
  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const exist = await UserModel.findOne({ where: { email } });
      
      if (!exist) {
        throw CustomError.badRequest("Wrong credentials");
      }

      const user = exist.dataValues;
      
      const isPasswordValid = this.comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw CustomError.badRequest("Wrong credentials");
      }

      return UserMapper.userEntityFromObject(user);

    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log("Error in login method:", error);
      throw CustomError.internalServerError(
        "An error occurred while logging in the user"
      );
    }
  }
}
