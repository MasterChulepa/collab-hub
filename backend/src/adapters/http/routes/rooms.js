import express from "express";
import { getRooms, getRoomDetail } from "../controllers/roomController.js";
export const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomDetail);
