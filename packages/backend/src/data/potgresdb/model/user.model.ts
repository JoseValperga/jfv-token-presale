import { DataTypes, Sequelize } from "sequelize";

export const UserModel = (sequelize: Sequelize) =>
  sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          name: "unique_email",
          msg: "Email must be unique",
        },
        validate: {
          isEmail: {
            msg: "Invalid email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
        },
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: ["USER_ROLE"],
        validate: {
          isValidRole(value: string[]) {
            const validRoles = ["USER_ROLE", "ADMIN_ROLE"];
            for (const role of value) {
              if (!validRoles.includes(role)) {
                throw new Error(`Rol inválido: ${role}`);
              }
            }
          },
        },
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );
