import express from "express";
import { getChats, createChat, deleteChat} from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/getChats", protectRoute, getChats);
router.post("/createChat", protectRoute, createChat);
router.post("/deleteChat", protectRoute, deleteChat);

export default router;