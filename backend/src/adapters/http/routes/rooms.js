import express from "express";
import {
  getRooms,
  getRoomDetail,
  createRoom,
} from "../controllers/roomController.js";
export const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomDetail);
router.post("/", createRoom);
