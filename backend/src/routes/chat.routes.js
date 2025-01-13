import express from "express";
import { getChats, createChat, deleteChat, getOtherChatters} from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/getChats", protectRoute, getChats);
router.post("/createChat", protectRoute, createChat);
router.post("/deleteChat", protectRoute, deleteChat);
router.get("/getOtherChatters/:chatId", protectRoute, getOtherChatters);

export default router;