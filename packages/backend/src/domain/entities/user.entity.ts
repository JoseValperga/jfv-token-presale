export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[] = ["USER_ROLE"],
    public img: string = "",
    public token: string = "",
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
