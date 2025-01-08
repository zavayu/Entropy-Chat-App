import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse json data
app.use(cookieParser()); // to parse cookie

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

// TODO: Change whitelisted IP's on DB to avoid errors
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectToMongoDB();
});