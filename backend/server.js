import "dotenv/config";
import { sequelize } from "./src/infrastructure/database/sequelize.mjs";
import express from "express";
import { router as roomRoutes } from "./src/adapters/http/routes/rooms.js";

const app = express();
app.use(express.json());
app.use("/api/rooms", roomRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
