import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkWebhooks } from "./controller/webhooks.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Async function to start server
const startServer = async () => {
  try {
    await connectDB(); // This will now log connection status
    
    // Routes
    app.get("/", (req, res) => res.send("API is working"));
    app.post("/clerk", clerkWebhooks);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();

export default app;