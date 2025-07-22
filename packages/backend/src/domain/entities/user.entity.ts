
export class UserEntity {
  constructor(
    public username: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string,
    public token?: string
  ) {}
}
