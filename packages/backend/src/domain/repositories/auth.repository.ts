import { RegisterUserDto } from '../dtos/auth/register-user.dto';

export abstract class AuthRepository {
    //todo: abstract login
    //abstract login(loginUserDto: LoginUserDto): Promise<LoginUserDto>;

    abstract register(registerUserDto: RegisterUserDto): Promise<RegisterUserDto>;
}