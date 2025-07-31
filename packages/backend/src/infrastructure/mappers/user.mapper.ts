import { UserEntity } from "../../domain";
import { CustomError } from "../../domain/errors/custom.error";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
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

    if (!id || !name || !email || !password || !role) {
      throw CustomError.badRequest("Id, name, email, password, and role are required");
    }

    return new UserEntity(
      id,
      name,
      email,
      password,
      role,
      img || null, // img is optional
      token || null, // token is optional
      createdAt || null, // createdAt is optional
      updatedAt || null // updatedAt is optional
    );
  }

}
