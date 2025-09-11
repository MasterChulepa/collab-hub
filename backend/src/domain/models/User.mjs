import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../infrastructure/database/sequelize.mjs";
import { compare, hash } from "bcrypt";

export class User extends Model {
  static async createUser(username, email, password) {
    const hashedPassword = await hash(password, 10);
    return this.create({
      username,
      email,
      password: hashedPassword,
    });
  }

  checkPassword(password) {
    return compare(password, this.password);
  }

  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(150),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(254),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_superuser: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    first_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await hash(user.password, 10);
        }
      },
    },
  }
);
