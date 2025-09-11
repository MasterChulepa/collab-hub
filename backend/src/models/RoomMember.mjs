import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.mjs";

export class RoomMember extends Model {
  toString() {
    return `${this.user?.username || "Unknown"} in ${
      this.room?.name || "Unknown"
    }`;
  }
}

RoomMember.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "rooms",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    joined_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "RoomMember",
    tableName: "room_members",
    timestamps: false,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ["room_id", "user_id"],
      },
    ],
  }
);
