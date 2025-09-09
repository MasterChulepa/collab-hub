import { serializeMessage } from "./messageSerializer.js";

async function serializeRoom(room, options = {}) {
  const result = {
    id: room.id,
    name: room.name,
    version: room.version,
  };

  if (options.includeMemberCount) {
    if (room.memberships) {
      result.member_count = room.memberships.length;
    } else {
      result.member_count = await room.countMemberships();
    }
  }

  // Добавляем последнее сообщение (если нужно)
  if (options.includeLastMessage && room.last_message) {
    result.last_message = serializeMessage(room.last_message);
  } else if (options.includeLastMessage && !room.last_message) {
    // Можно загрузить последнее сообщение если не загружено
    const lastMessage = await room.getLast_message();
    if (lastMessage) {
      result.last_message = serializeMessage(lastMessage);
    }
  }

  return result;
}

// Массовая сериализация комнат
export async function serializeRooms(rooms, options = {}) {
  const serializedRooms = [];

  for (const room of rooms) {
    serializedRooms.push(await serializeRoom(room, options));
  }

  return serializedRooms;
}
