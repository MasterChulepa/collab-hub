import { Room } from "../../../domain/models/index.mjs";
import {
  serializeRooms,
  serializeRoom,
} from "../../../shared/serializers/roomSerializers.js";

export async function getRooms(req, res) {
  try {
    const rooms = await Room.findAll({
      include: [
        {
          association: "last_message",
          include: ["user"],
        },
      ],
      order: [["bumped_at", "DESC"]],
    });

    const serializedRooms = await serializeRooms(rooms, {
      includeMemberCount: false,
      includeLastMessage: false,
    });

    res.json(serializedRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getRoomDetail(req, res) {
  try {
    const room = await Room.findByPk(req.params.id, {
      include: [
        {
          association: "last_message",
          include: ["user"],
        },
        {
          association: "memberships",
          include: ["user"],
        },
        {
          association: "messages",
          include: ["user"],
          limit: 20,
          order: [["created_at", "DESC"]],
        },
      ],
    });

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    const serializedRoom = await serializeRoom(room, {
      includeMemberCount: false,
      includeLastMessage: false,
    });

    serializedRoom.members = room.memberships.map((membership) => ({
      id: membership.user.id,
      username: membership.user.username,
      joined_at: membership.joined_at,
    }));

    serializedRoom.messages = room.messages.map((message) => ({
      id: message.id,
      content: message.content,
      created_at: message.created_at,
      user: message.user
        ? {
            id: message.user.id,
            username: message.user.username,
          }
        : null,
    }));

    res.json(serializedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createRoom(req, res) {
  try {
    const { name } = req.body || {};
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "'name' is required" });
    }

    const trimmedName = name.trim();

    const existing = await Room.findOne({ where: { name: trimmedName } });
    if (existing) {
      return res
        .status(409)
        .json({ error: "Room with this name already exists" });
    }

    const room = await Room.create({ name: trimmedName });
    const serialized = await serializeRoom(room, {
      includeMemberCount: false,
      includeLastMessage: false,
    });
    return res.status(201).json(serialized);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
