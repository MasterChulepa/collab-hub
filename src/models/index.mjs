import { RoomMember } from "./RoomMember.mjs";
import { Room } from "./Room.mjs";
import { Message } from "./Message.mjs";
import { User } from "./User.mjs";

Room.hasMany(Message, {
  foreignKey: "room_id",
  as: "messages",
});
Room.hasMany(RoomMember, {
  foreignKey: "room_id",
  as: "memberships",
});
Room.belongsTo(Message, {
  foreignKey: "last_message_id",
  as: "last_message",
});

User.hasMany(Message, {
  foreignKey: "user_id",
  as: "messages",
});
User.hasMany(RoomMember, {
  foreignKey: "user_id",
  as: "rooms",
});

RoomMember.belongsTo(Room, {
  foreignKey: "room_id",
  as: "room",
});
RoomMember.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

Message.belongsTo(Room, {
  foreignKey: "room_id",
  as: "room",
});
Message.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

export { User } from "./User.mjs";
export { Room } from "./Room.mjs";
export { Message } from "./Message.mjs";
export { RoomMember } from "./RoomMember.mjs";
