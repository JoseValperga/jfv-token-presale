
export class UserEntity {
  constructor(
    public id: string,
    public username: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string,
    public token?: string
  ) {}
}
