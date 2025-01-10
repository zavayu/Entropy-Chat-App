import express from "express";
import { getContacts, addContact } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/getContacts", protectRoute, getContacts);
router.post("/addContact", protectRoute, addContact);

export default router;