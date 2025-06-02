import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkWebhooks } from "./controller/webhooks.js";

const app = express();

// Middleware
await connectDB()
app.use(cors())

// Routes
app.get("/", (req, res) => res.send("API is working"))
app.post('/clerk', express.json(), clerkWebhooks)

// Start server only if not in Vercel environment

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });


export default app;