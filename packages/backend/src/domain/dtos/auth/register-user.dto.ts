import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public id: string = "",
    public name: string,
    public email: string,
    public password: string,
    public role: string[] = ["USER_ROLE"],
    public img: string = "",
    public token: string = "",
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const {
      id,
      name,
      email,
      password,
      role,
      img,
      token,
      createdAt,
      updatedAt,
    } = object;
    if (!name) return ["Missing name"];
    if (!Validators.email.test(email)) return ["Invalid email format"];
    if (!password) return ["Missing password"];
    if (password.length < 6)
      return ["Password must be at least 6 characters long"];

    return [
      undefined,
      new RegisterUserDto(id, name, email, password, role, img, token),
    ];
  }
}
