import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsers, sendMessage, getMessagesByChat, getLastMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsers);
router.get("/:id", protectRoute, getMessages);
router.get("/chat/:id", protectRoute, getMessagesByChat);
router.get("/chat/:id/last", protectRoute, getLastMessage);
router.post("/send/:id", protectRoute, sendMessage)

export default router;