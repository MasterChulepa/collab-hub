import { Room } from "../models/index.mjs";
import { serializeRooms } from "../serializers/roomSerializers.js";

export async function getRooms(req, res) {
  try {
    const rooms = await Room.findAll({
      include: [
        {
          association: "last_message",
          include: ["user"], // Включаем пользователя для последнего сообщения
        },
      ],
      order: [["bumped_at", "DESC"]], // Сортировка по активности
    });

    const serializedRooms = await serializeRooms(rooms, {
      includeMemberCount: false,
      includeLastMessage: false,
    });

    res.json(serializedRooms);
    // console.log("Rooms!!!!!!!!", rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
