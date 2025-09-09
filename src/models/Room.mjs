import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.mjs";

export class Room extends Model {
  async incrementVersion() {
    this.version = (this.version || 0) + 1;
    this.bumped_at = new Date();
    await this.save();
    return this.version;
  }

  toString() {
    return this.name;
  }
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    version: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    bumped_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    last_message_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "messages",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Room",
    tableName: "rooms",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeUpdate: (room) => {
        if (room.changed("version")) {
          room.bumped_at = new Date();
        }
      },
    },
  }
);
