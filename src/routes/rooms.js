import express from "express";
import { getRooms } from "../controllers/roomController.js";
export const router = express.Router();

router.get("/", getRooms);
