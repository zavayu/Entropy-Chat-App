import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // to parse json data
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

// TODO: Change whitelisted IP's on DB to avoid errors
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    connectToMongoDB();
});