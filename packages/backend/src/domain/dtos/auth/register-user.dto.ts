import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public username: string,
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { username, name, email, password } = object;
    if (!username) return ["Missing username"];
    if (!name) return ["Missing name"];
    if (!Validators.email.test(email)) return ["Invalid email format"];
    if (!password) return ["Missing password"];
    if (password.length < 6)
      return ["Password must be at least 6 characters long"];

    return [undefined, new RegisterUserDto(username, name, email, password)];
  }
}
