import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkWebhooks } from "./controller/webhooks.js";

const app = express();

// Middleware
await connectDB();
app.use(cors());
app.use(express.json()); // Ensure JSON parsing for all routes

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.post("/clerk", clerkWebhooks);

export default app;