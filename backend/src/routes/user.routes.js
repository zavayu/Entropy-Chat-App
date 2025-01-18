import express from "express";
import { getContacts, addContact, deleteContact, getUser, getUserFromEmail } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/getContacts", protectRoute, getContacts);
router.get("/getUser/:id", protectRoute, getUser);
router.get("/getUserFromEmail/:email", protectRoute, getUserFromEmail);
router.post("/addContact", protectRoute, addContact);
router.post("/deleteContact", protectRoute, deleteContact);

export default router;